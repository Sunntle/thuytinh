const { Recipes, Materials } = require("../models");
const { Op } = require("sequelize");
exports.list = async (req, res) => {
  try {
    const { _offset, _limit, _sort, _order, q, ...rest } = req.query;
    const query = {
      raw: true,
      include: [{ model: Materials, attributes: ["name_material"] }],
    };
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (q) query.where = { name_product: { [Op.like]: `%${q}%` } };
    if (_sort) query.order = [[_sort, _order]];
    const response = await Recipes.findAll(query);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getRecipeByProduct = async (req, res) => {
  try {
    const idProduct = req.params.id;
    const response = await Recipes.findAll({
      where: { id_product: idProduct },
      raw: true,
      include: [{ model: Materials, attributes: ["name_material"] }],
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addRecipe = async (req, res) => {
  try {
    const response = await Recipes.create(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateRecipe = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Recipes.update(req.body, {
      where: { id: _id },
    });
    res.status(200).json("Cập nhật công thức thành công !");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateRecipeById = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Recipes.update(req.body, {
      where: { id_product: _id },
    });
    res.status(200).json("Cập nhật công thức thành công !");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removeRecipe = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Recipes.destroy({
      where: { id: _id },
    });
    res.status(200).json("Xóa công thức thành công");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
