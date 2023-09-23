
const moment = require('moment');
const asyncHandler = require('express-async-handler');
const { Order, OrderDetail, Product, ImageProduct, User, Category, Tables } = require('../models');
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require('../config/connectDatabase');

function currentYear(pa = "startOf") {
    const date = moment()[pa]('year');
    return date.format('YYYY-MM-DD');
}
exports.createOrder = asyncHandler(async (req, res) => {
    const { order, customerName, total } = req.body;
    const order_result = await Order.create({ total, name: customerName });
    let val = order.map(item => ({ id_product: item.id, quantity: item.quantity, id_order: order_result.id }));
    const order_detail = await OrderDetail.bulkCreate(val);
    let pro = await Product.findAll({
        where: {
            id: { [Op.in]: order_detail.map(item => item.id_product) }
        },
        include: [{ model: ImageProduct, attributes: ["url", "id"] }],
    })
    const result = { orders: order_result, detail: order_detail, product: pro };
    res.status(200).json(result);

  const order_result = await Order.create({
    total,
    name: customerName,
    date_order: new Date(),
  });
  let val = orders.map((item) => ({
    id_product: item.id,
    quantity: item.quantity,
    id_order: order_result.id,
  }));
  const order_detail = await OrderDetail.bulkCreate(val);
  let pro = await Product.findAll({
    where: {
      id: { [Op.in]: order_detail.map((item) => item.id_product) },
    },
    include: [{ model: ImageProduct, attributes: ["url", "id"] }],
  });
  const result = { orders: order_result, detail: order_detail, products: pro };
  res.status(200).json(result);
});

exports.GetAllOrder = asyncHandler(async (req, res) => {
  const { key_sort, val_sort, page, limit } = req.query;
  const page_current = +page || 1;
  const li = limit || 10;
  const offset = +(page_current > 0 ? (page_current - 1) * li : 0);
  let con = { limit: li, offset: offset };

  if (key_sort && val_sort) con.order = [[key_sort, val_sort]];

  const data = await Order.findAll({
    ...con,
    include: [
      {
        model: OrderDetail,
        include: [
          {
            model: Product,
            as: "product",
            include: [
              {
                model: ImageProduct,
                attributes: ["url"],
              },
            ],
          },
        ],
      },
      {
        model: User,
        attributes: ["name", "email", "phone"],
        as: "user",
      },
      {
        model: User,
        attributes: ["name"],
        as: "employee",
      },
    ],
  });
  res.status(200).json(data);
});

exports.delOrder = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Order.destroy({ where: { id } });
  res.status(200).json("Xóa đơn hàng thành công");
});
exports.updateOrder = asyncHandler(async (req, res) => {
  const { id, ...rest } = req.body;
  await Order.update(rest, {
    where: { id: id },
  });
  res.status(200).json("Update thành công");
});
exports.dashBoard = asyncHandler(async (req, res) => {
    let data = {};
    const type = req.query.type;
    const info = type === "MONTH" ? "T/" : "Năm : ";
    const currentMonth = new Date();
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    previousMonth.setDate(1);
    let con = {
        group: [Sequelize.fn(type, Sequelize.col('createdAt'))],
        order: [[type, "ASC"]],
        raw: true
    }
    if (type === "MONTH") con.where = {
        createdAt: {
            [Op.between]: [currentYear(), currentYear("endOf")]
        }
    }
    data.totalMonth = (await Order.findAll({
        attributes: [
            [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
        ],
        where: {
            createdAt: {
                [Op.between]: [previousMonth, currentMonth]
            }
        },
        group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))],
        order: [[Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'ASC']]
    })).map(item => item.total)
    data.category = await Category.findAll({
        attributes: ['name_category', 'thumbnail', [Sequelize.fn('COUNT', Sequelize.col('Products.id')), 'productCount']],
        include: [{ model: Product, attributes: [] }],
        group: ['Category.id', 'name_category']
    });
    data.order = await Order.count()
    data.user = await User.count({ where: { "role": "R1" } })
    data.food = await Product.count();
    data.table = await Tables.sum("total_booked");

    data.chart_order = (await Order.findAll({
        attributes: [
            [Sequelize.fn(type, Sequelize.col('createdAt')), type],
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalOrder'],
            [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
        ],
        ...con
    })).reduce((acc, item) => {
        acc.labels.push(`${info}${item[type]}`);
        acc.values.push(item['totalOrder']);
        return acc;
    }, { labels: [], values: [] });
    res.status(200).json(data);
});
