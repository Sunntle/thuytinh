const { Product } = require("../models");
const { Op } = require("sequelize");
exports.list = async (req, res) => {
  try {
    const { _offset, _limit, _sort, _order, q, ...rest } = req.query;
    const query = { raw: true, include: Image };
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (q) query.where = { name_product: { [Op.like]: `%${q}%` } };
    if (_sort) query.order = [[_sort, _order]];
    const response = await Product.findAll(query);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getDetail = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Product.findOne({ where: { id: _id }, include: Image });
    if (!response) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getByCategory = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Product.findOne({ where: { id_category: _id }, include: Image });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addItem = async (req, res) => {
  try {
    const { id_category } = req.body;
    if (id_category) {
      const response = await Product.create(req.body);
      res.status(201).json(response);
    } else {
      res.status(400).json({ error: "The product must have the id of the category" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
