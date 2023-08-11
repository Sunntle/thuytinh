const { Category } = require("../models");
const { Op } = require("sequelize");
exports.list = async (req, res) => {
  try {
    const { _offset, _limit, _sort, _order, q, ...rest } = req.query;
    const query = { raw: true };
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (q) query.where = { name_product: { [Op.like]: `%${q}%` } };
    if (_sort) query.order = [[_sort, _order]];
    const response = await Category.findAll(query);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
