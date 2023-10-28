const { Notification } = require("../models");
const { Op } = require("sequelize");
const asyncHandler = require('express-async-handler');
exports.list = asyncHandler(async (req, res) => {

    const { _offset, _limit, _sort, _order, q, ...rest } = req.query;
    const query = { raw: true };
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (_sort) query.order = [[_sort, _order]];
    const response = await Notification.findAll(query);
    res.status(200).json(response);

})
exports.add = asyncHandler(async (req, res) => {
    let result = await Notification.create(req.body);
    res.status(200).json("Thanh cong");
})
exports.maskAsRead = asyncHandler(async (req, res) => {
    const { listId } = req.body
    const response = await Notification.update({ status: 1, updatedAt: new Date().toISOString() }, {
        where: {
            id: listId.map(el => el.id)
        }
    });
    res.status(200).json(response);
})
exports.destroy = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const response = await Notification.destroy({
        where: { id: _id }
    })
    res.status(200).json(response);
})