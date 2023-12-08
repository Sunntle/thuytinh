
const {
  apiQueryRest,
  checkQtyMaterials,
  getQtyMaterialByProduct,
  bien, currentYear, tinhWeek, checkBooking, handleTimeDining, checkOverMaterial, getMonthAndYear
} = require("../utils/const");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const {
  Order,
  OrderDetail,
  Product,
  ImageProduct,
  User,
  Category,
  Tables,
  Materials,
  Notification,
  TableByOrder,
  Recipes,
  Warehouse,
} = require("../models");
const { Op, Sequelize, literal, where, fn, col } = require("sequelize");



exports.createOrder = asyncHandler(async (req, res) => {
  const { orders, customerName, total, table, id_employee, token } = req.body;
  if (!total || !customerName || table.length === 0 || orders.length === 0)
    return res.status(404).json({
      success: false,
      data: "Validate !",
    });
  const arrTable = table;
  const checkStatus = await Tables.prototype.checkStatus(arrTable, 0, token);
  if (checkStatus) return res.status(404).json({ success: false, data: "Bàn đã được đặt trước" });
  const { approve, over } = await Materials.prototype.checkAmountByProduct(orders);
  if (over.length > 0) {
    return res.status(200).json({ success: false, message: `${over[0].name_product} không đủ số lượng` });
  }
  const priceOver = approve.reduce((con, cur) => con + cur.price * cur.quantity, 0);
  if (approve.length === 0)
    return res
      .status(200)
      .json({ success: false, data: "Sản phẩm hết nguyên liệu" });
  const order_result = await Order.create({
    total: priceOver,
    name: customerName,
    id_employee
  });
  let dataTable = await TableByOrder.bulkCreate(
    arrTable.map((item) => ({ tableId: item, orderId: order_result.id, dining_option: "eat-in" })),
  );
  if (id_employee) await Tables.prototype.updateStatusTable({ status_table: 1 }, arrTable);
  let tableData = await TableByOrder.findAll({
    include: { model: Tables },
    where: { id: { [Op.in]: dataTable.map((i) => i.id) } },
  });

  let val = approve.map((item) => ({
    id_product: item.id,
    quantity: item.quantity,
    id_order: order_result.id,
  }));

  const order_detail = await OrderDetail.bulkCreate(val);
  let product = await Product.findAll({
    where: { id: { [Op.in]: order_detail.map((item) => item.id_product) } },
    include: [{ model: ImageProduct, attributes: ["url", "id"] }],
  });
  let result = {
    orders: order_result,
    detail: order_detail,
    product,
    over,
    tableByOrder: tableData,
    over,
  };

  if (!id_employee) {
    await Notification.create(
      { type: "order", description: `Bàn - ${table[0]} vừa đặt món`, content: order_result.id },
      { raw: true },
    );
    // _io.of("/client").emit("status order", { ...result, message: "Đặt món thành công! Đợi một chút quán làm món nhé <3" });// check correct order
  }
  res.status(200).json({ success: true, data: result });
});

exports.GetAllOrder = asyncHandler(async (req, res) => {
  let query = {
    ...apiQueryRest({ ...req.query, title: "name" }),
    nest: true,
  };
  const { count, rows } = await Order.findAndCountAll({
    ...query,
    include: [
      {
        ...bien.include,
      },
      { model: TableByOrder, attributes: ["tableId", "status"] },
      {
        model: User,
        attributes: ["name"],
      },
    ],
  });

  res.status(200).json({ total: count, data: rows });
});

exports.delOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Order.destroy({ where: { id } });
  res.status(200).json("Xóa đơn hàng thành công");
});

exports.updateOrder = asyncHandler(async (req, res) => {
  const { id_order, carts, id_table, total } = req.body;
  const over = [];
  let current = await OrderDetail.findAll({
    where: {
      [Op.or]: carts.map((item) => ({ id_product: item.id, id_order })),
    },
    raw: true,
  });

  let check = false;
  for (const cart of carts) {
    if (cart.inDb) cart.quantity -= cart.inDb;
    const val = await getQtyMaterialByProduct(cart);
    const result = await checkQtyMaterials(val, Materials);
    if (!result) {
      check = true;
      res.status(200).json({ success: false, data: cart, message: `${cart.name_product} không đủ số lượng` });
      break;
    }
  }
  if (!check) {
    for (const cart of carts) {
      const orderDatabase = current.find((ele) => ele.id_product === cart.id);
      const val = await getQtyMaterialByProduct(cart);
      if (orderDatabase) {

        await Promise.all(val.map(
          async (item) => {
            await Materials.decrement("amount", {
              by: item.total,
              where: { id: item.id_material },
            })
            await checkOverMaterial(Materials, item.id_material)
          }
        ))

        await OrderDetail.increment("quantity", {
          by: cart.quantity,
          where: { id: orderDatabase.id },
        });
      } else {

        await Promise.all(val.map(
          async (item) => {
            await Materials.decrement("amount", {
              by: item.total,
              where: { id: item.id_material },
            })
            await checkOverMaterial(Materials, item.id_material)
          }
        ))

        await OrderDetail.create({
          id_product: cart.id,
          quantity: cart.quantity,
          id_order: id_order,
        });
      }
    }
    await Order.update({ total }, { where: { id: id_order } });
    res.status(200).json({ message: "Update thành công", over, success: true });
  }

});


exports.updateOrderAdmin = asyncHandler(async (req, res) => {
  const { table, id, ...rest } = req.body;
  if (rest.status == 4) {
    await Tables.prototype.updateStatusTable({
      status_table: 0,
      token: null
    }, [table]);
  }
  await Order.update({ ...rest }, { where: { id } });
  _io.of("/client").emit("complete-payment", { data: table[0], message: "Hoàn tất thanh toán" })
  res.status(200).json("Update thành công");
});
exports.completeOrder = asyncHandler(async (req, res) => {
  const { orderId, tableId } = req.body;
  const is = await Order.findOne({ where: { id: orderId, status: 3 }, raw: true });
  if (is) {
    await Tables.prototype.updateStatusTable({
      status_table: 0,
      token: null
    }, [tableId]);
    let re = await TableByOrder.findOne({ where: { orderId, tableId } });
    re.dining_time = handleTimeDining(re.createdAt);
    await re.save();
    await Order.update({ status: 4 }, { where: { id: orderId } });
    _io.of("/client").emit("complete-payment", { data: tableId, message: "Hoàn tất thanh toán" })
    res.status(200).json({ success: true, data: "Update thành công" });
  } else {
    res
      .status(404)
      .json({ success: false, data: "Người dùng chưa thanh toán" });
  }
});

exports.dashBoard = asyncHandler(async (req, res) => {
  let data = {};
  const currentMonth = new Date();

  const { type, weekcurrent } = req.query;
  const info = type === "MONTH" ? "T/" : "Năm : ";

  let dateInWeek = tinhWeek(weekcurrent);

  data.costMaterial = await Warehouse.findOne({
    attributes: [[literal("SUM(price_import * amount_import)"), "total_cost"]],
    where: {
      [Op.and]: [
        where(fn("MONTH", col("createdAt")), currentMonth.getMonth() + 1),
        where(fn("YEAR", col("createdAt")), currentMonth.getFullYear()),
      ],
    },
    raw: true
  });
  let con = {
    group: [Sequelize.fn(type, Sequelize.col("createdAt"))],
    order: [[type, "ASC"]],
    raw: true,
  };
  const specificDate = moment(currentMonth).format("MM-YYYY");
  const lastMonthDate = moment(currentMonth).subtract(1, 'months').format("MM-YYYY");

  if (type === "MONTH") con.where = {
    createdAt: {
      [Op.between]: [currentYear(), currentYear("endOf")],
    },
  };

  data.montdPreAndCur = await Order.findAll({
    attributes: [
      [fn('SUM', col('total')), 'total'],
      [fn('DATE_FORMAT', col('createdAt'), '%m-%Y'), 'month'],
    ],
    where: {
      [Op.or]: [
        literal(`DATE_FORMAT(\`createdAt\`, '%m-%Y') = '${lastMonthDate}'`),
        literal(`DATE_FORMAT(\`createdAt\`, '%m-%Y') = '${specificDate}'`),
      ]
    },
    group: ["month"],
    order: [["month", 'asc']],
    raw: true
  });

  data.chartWeek = await Order.findAll({
    attributes: [
      [fn('date', col('createdAt')), 'createdAt'],
      [fn('sum', col('total')), 'total'],
      [fn('count', col('id')), 'totalOrder']
    ],
    where: {
      createdAt: {
        [Op.gte]: dateInWeek.shift(),
        [Op.lte]: dateInWeek.pop()
      }
    },
    group: [fn('date', col('createdAt'))],
    order: [["createdAt", "asc"]],
    raw: true
  });


  const { count, rows } = await Product.findAndCountAll({
    attributes: ["name_product", "sold"],
    include: { model: ImageProduct, attributes: ["url"] },
    order: [["sold", "DESC"]],
  });
  data.productBySold = rows;
  data.food = count;
  const { count: countOrder, rows: rowOrder } = await Order.findAndCountAll({
    attributes: [[fn("sum", col("total")), "total"]],
  });
  data.countOrder = countOrder;
  data.totalOrderYear = rowOrder[0]?.total;
  data.user = await User.count({ where: { role: "R2" } });
  data.table = await Tables.sum("total_booked");

  data.chart_order = (
    await Order.findAll({
      attributes: [
        [fn(type, col("createdAt")), type],
        [fn("COUNT", col("id")), "totalOrder"],
        [fn("SUM", col("total")), "total"],
      ],
      ...con,
    })
  ).reduce(
    (acc, item) => {
      acc.labels.push(`${info}${item[type]}`);
      acc.values.push(item["totalOrder"]);
      return acc;
    },
    { labels: [], values: [] },
  );
  res.status(200).json(data);
});

exports.getOrderById = asyncHandler(async (req, res) => {
  const { id: idOrder } = req.params;
  try {
    const existingOrder = await Order.findOne({
      where: { id: idOrder },
      include: [{ ...bien.include }, { model: TableByOrder }],
    });
    if (existingOrder) res.status(200).json({ data: existingOrder });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
