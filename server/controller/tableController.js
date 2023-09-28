const { Tables, Order } = require('../models');
const asyncHandler = require('express-async-handler');

exports.getAll = asyncHandler(async (req, res) => {
    const re = await Tables.findAll({ include: { model: Order } });
    res.status(200).json(re);
});
exports.getId = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const re = await Tables.findByPk(id);
    res.status(200).json(re);
});
exports.create = asyncHandler(async (req, res) => {
    const { name_table } = req.body;
    const [table, created] = await Tables.findOrCreate({
        where: { name_table: name_table }, defaults: req.body
    });
    if (created) return res.status(200).json('Tạo bàn thành công')
    res.status(404).json('Đã có tên bàn trên');
});
exports.update = asyncHandler(async (req, res) => {
    const { id, ...rest } = req.body;
    const isName = await Tables.findOne({ where: { name_table: req.body.name_table } });
    if (isName) return res.status(200).json('Trùng tên bàn khác');
    await User.update(rest, {
        where: { id: id }
    });
    res.status(200).json('Cập thành công');
});
exports.del = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Tables.destroy({
        where: { id }
    });
    res.status(200).json('Xóa thành công');
});
//, order: [["createdAt", "asc"]] 