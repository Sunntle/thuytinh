const moment = require("moment");
const {
  apiQueryRest,
  checkQtyMaterials,
  getQtyMaterialByProduct,
  bien,
} = require("../utils/const");
const asyncHandler = require("express-async-handler");
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

function currentYear(pa = "startOf") {
  const date = moment()[pa]("year");
  return date.format("YYYY-MM-DD");
}

exports.createOrder = asyncHandler(async (req, res) => {
  const { orders, customerName, total, table, id_employee, token } = req.body;
  if (!total || !customerName || table.length === 0 || orders.length === 0)
    return res.status(200).json({
      success: false,
      data: "Validate !",
    });
  const arrTable = table;

  if (await Tables.prototype.checkStatus(arrTable, 0, token))
    return res.status(200).json({
      success: false,
      data: "Bàn đã có người đặt",
    });

  const { approve, over } = await Materials.prototype.checkAmountByProduct(orders);
  if (approve.length === 0)
    return res
      .status(200)
      .json({ success: false, data: "Sản phẩm hết nguyên liệu" });
  const order_result = await Order.create({
    total,
    name: customerName,
    id_employee,
  });
  let dataTable = await TableByOrder.bulkCreate(
    arrTable.map((item) => ({ tableId: item, orderId: order_result.id })),
  );
  if (id_employee) await Tables.prototype.updateStatusTable(arrTable, 1);
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
    over
  };

  if(!id_employee){
    await Notification.create(
      { type: "order", description: `Bàn -${table[0]} vừa đặt món`, content: order_result.id },
      { raw: true },
    );
    _io.of("/client").emit("status order", {...result, message: "Đặt món thành công! Đợi một chút quán làm món nhé <3"});// check correct order
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
      { model: TableByOrder, attributes: ["tableId"] },
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
  await Order.update({ total }, { where: { id: id_order } });
  for (const cart of carts) {
    let orderDatabase = current.find((ele) => ele.id_product === cart.id);
    let val = await getQtyMaterialByProduct(cart);
    let result = await checkQtyMaterials(val, Materials);
    if (orderDatabase) {
      cart.quantity -= orderDatabase.quantity;
      if (cart.quantity > 0) {
        if (result) {
          await Promise.all(
            val.map(
              async (item) =>
                await Materials.decrement("amount", {
                  by: item.total,
                  where: { id: item.id_material },
                }),
            ),
          );
          await OrderDetail.increment("quantity", {
            by: cart.quantity,
            where: { id: orderDatabase.id },
          });
        } else {
          over.push(cart);
          await Product.update({ status: 4 }, { where: { id: cart.id } });
        }
      }
    } else {
      if (result) {
        await Promise.all(
          val.map(
            async (item) =>
              await Materials.decrement("amount", {
                by: item.total,
                where: { id: item.id_material },
              }),
          ),
        );
        await OrderDetail.create({
          id_product: cart.id,
          quantity: cart.quantity,
          id_order: id_order,
        });
      } else {
        over.push(cart);
        await Product.update({ status: 4 }, { where: { id: cart.id } });
      }
    }
  }
  res.status(200).json("Update thành công");
});

exports.updateOrderAdmin = asyncHandler(async (req, res) => {
  const { table, id, ...rest } = req.body;
  await Order.update({ ...rest }, { where: { id } });
  await TableByOrder.destroy({ where: { orderId: id } });
  await TableByOrder.bulkCreate(
    table.map((item) => ({
      tableId: +item,
      orderId: id,
    })),
  );
  res.status(200).json("Update thành công");
});
exports.completeOrder = asyncHandler(async (req, res) => {
  const { orderId, tableId } = req.body;
  const is = await Order.findOne({ where: { id: orderId, status: 3 }, raw: true });
  if (is) {
    await Tables.update({ status_table: 0, token: null }, { where: { id: tableId } });
    await Order.update({ status: 4 }, { where: { id: orderId } });
    res.status(200).json({ success: true, data: "Update thành công" });
  } else {
    res.status(404).json({ success: false, data: "Người dùng chưa thanh toán" });
  }
});

exports.dashBoard = asyncHandler(async (req, res) => {
  let data = {};
  const type = req.query.type;
  const info = type === "MONTH" ? "T/" : "Năm : ";
  const currentMonth = new Date();

  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  previousMonth.setDate(1);
  data.costMaterial = await Warehouse.findOne({
    attributes: [[literal("SUM(price_import * amount_import)"), "total_cost"]],
    where: {
      [Op.and]: [
        where(fn("MONTH", col("createdAt")), currentMonth.getMonth() + 1),
        where(fn("YEAR", col("createdAt")), currentMonth.getFullYear()),
      ],
    },
    raw: true,
  });

  let con = {
    group: [Sequelize.fn(type, Sequelize.col("createdAt"))],
    order: [[type, "ASC"]],
    raw: true,
  };
  if (type === "MONTH")
    con.where = {
      createdAt: {
        [Op.between]: [currentYear(), currentYear("endOf")],
      },
    };
  data.montdPreAndCur = await Order.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("total")), "total"],
      [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
    ],
    where: {
      createdAt: {
        [Op.or]: [
          {
            [Op.between]: [previousMonth, currentMonth],
          },
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("createdAt")),
            currentYear(),
          ),
        ],
      },
    },
    group: [Sequelize.fn("MONTH", Sequelize.col("createdAt"))],
    order: [[Sequelize.fn("MONTH", Sequelize.col("createdAt")), "desc"]],
    raw: true,
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
        [Sequelize.fn(type, Sequelize.col("createdAt")), type],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalOrder"],
        [Sequelize.fn("SUM", Sequelize.col("total")), "total"],
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
