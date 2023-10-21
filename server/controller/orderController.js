const moment = require("moment");
const { apiQueryRest } = require('../utils/const')
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
} = require("../models");
const { Op, Sequelize } = require("sequelize");

function currentYear(pa = "startOf") {
  const date = moment()[pa]('year');
  return date.format('YYYY-MM-DD');
}

exports.createOrder = asyncHandler(async (req, res) => {
  const { orders, customerName, total, table } = req.body;
  const arrTable = table || [1, 2];

  if (await Tables.prototype.checkStatus(arrTable, 0)) return res.status(200).json({ success: false, data: "Bàn đã có người đặt" })

  const { approve, over } = await Materials.prototype.checkAmountByProduct(orders);
  if (approve.length === 0) return res.status(200).json({ success: false, data: "Sản phẩm hết nguyên liệu" });
  const order_result = await Order.create({ total, name: customerName });
  let dataTable = await TableByOrder.bulkCreate(arrTable.map(item => ({ tableId: item, orderId: order_result.id })));
  await Tables.prototype.updateStatusTable(arrTable, 1)
  let tableData = await TableByOrder.findAll({ include: { model: Tables }, where: { id: { [Op.in]: dataTable.map(i => i.id) } } })

  let val = approve.map((item) => ({
    id_product: item.id,
    quantity: item.quantity,
    id_order: order_result.id
  }));

  const order_detail = await OrderDetail.bulkCreate(val);
  let product = await Product.findAll({
    where: { id: { [Op.in]: order_detail.map((item) => item.id_product) } }, include: [{ model: ImageProduct, attributes: ["url", "id"] }]
  });
  let result = { orders: order_result, detail: order_detail, product, tableByOrder: tableData };

  let storeNotification = await Notification.create(
    { type: "order", description: `Có đơn hàng mới`, content: order_result.id }, { raw: true }
  );
  _io.of("/admin").emit("new message", storeNotification)
  _io.of("/client").emit("status order", result)
  res.status(200).json({ success: true, data: result });

});

exports.GetAllOrder = asyncHandler(async (req, res) => {
  let query = {
    ...apiQueryRest({ ...req.query, title: "name" }), nest: true
  };
  const { count, rows } = await Order.findAndCountAll({
    ...query,
    include: [
      {
        model: OrderDetail,
        include:
        {
          model: Product,
          include:
          {
            model: ImageProduct,
            attributes: ["url"],
          }
        },

      },
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
const { id, updatedQuantities, updateTotal } = req.body;
  console.log(id)
  console.log(updatedQuantities)
  await Order.update({ total: updateTotal }, { where: { id: id } });
  await Promise.all(updatedQuantities.map(async (item) => {
    await OrderDetail.update({ quantity: item.quantity }, {
      where: { id_order: id, id_product: item.id_product },
    });
  }));
  res.status(200).json("Update thành công");
});

// exports.updateOrder = asyncHandler(async (req, res) => {
//   const { id, ...rest } = req.body;

//   const order = rest
//   console.log(order);

//   const existingOrder = await OrderDetail.findOne({ where: { id_order: id } });
//   // console.log(existingOrder)
//   // if(existingOrder) {
//   //   await existingOrder.update({
//   //     quantity: existingOrder.quantity + rest?.quantity
//   //   })
//   // }

//   // if (existingOrder) {
//   //   await existingOrder.update(rest);
//   //   res.status(200).json("Cập nhật thành công");
//   // } else {
//   //   await Order.create({ id, ...rest });
//   //   res.status(201).json("Tạo mới thành công");
//   // }
// });

exports.dashBoard = asyncHandler(async (req, res) => {
  let data = {};
  const type = req.query.type;
  const info = type === "MONTH" ? "T/" : "Năm : ";
  const currentMonth = new Date();
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  previousMonth.setDate(1);
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
  data.totalMonth = (
    await Order.findAll({
      attributes: [[Sequelize.fn("SUM", Sequelize.col("total")), "total"]],
      where: {
        createdAt: {
          [Op.between]: [previousMonth, currentMonth],
        },
      },
      group: [Sequelize.fn("MONTH", Sequelize.col("createdAt"))],
      order: [[Sequelize.fn("MONTH", Sequelize.col("createdAt")), "ASC"]],
    })
  ).map((item) => item.total);
  data.category = await Category.findAll({
    attributes: [
      "name_category",
      "thumbnail",
      [Sequelize.fn("COUNT", Sequelize.col("Products.id")), "productCount"],
    ],
    include: [{ model: Product, attributes: [] }],
    group: ["Category.id", "name_category"],
  });
  data.order = await Order.count();
  data.user = await User.count({ where: { role: "R1" } });
  data.food = await Product.count();
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