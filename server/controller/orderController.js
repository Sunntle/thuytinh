
const asyncHandler = require('express-async-handler');
const { Order, OrderDetail, Product, ImageProduct, User } = require('../models')
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