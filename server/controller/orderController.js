
const asyncHandler = require('express-async-handler');
const { Order, OrderDetail, Product, ImageProduct, User } = require('../models');
const { Op, Sequelize } = require("sequelize");
exports.createOrder = asyncHandler(async (req, res) => {
    const { order, customerName, total } = req.body;
    const order_result = await Order.create({ total, name: customerName, date_order: new Date() });
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
        include:
            [{
                model: OrderDetail, include: [{
                    model: Product, as: 'product',
                    include: [{
                        model: ImageProduct,
                        attributes: ["url"]
                    }]
                }]
            }, {
                model: User,
                attributes: ["name", "email", "phone"],
                as: 'user'
            }, {
                model: User,
                attributes: ["name"],
                as: 'employee'
            }]
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
        where: { id: id }
    })
    res.status(200).json("Update thành công");
});
