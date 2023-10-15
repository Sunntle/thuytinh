const { Category, Product } = require("../models");
const { Op } = require("sequelize");

exports.list = async (req, res) => {
  try {
    const { _offset, _limit, _sort, _order, q, ...rest } = req.query;
    const query = { raw: true };
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (q) query.where = { name_category: { [Op.substring]: q } };
    if (_sort) query.order = [[_sort, _order]];
    const response = await Category.findAll(query);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addCate = async (req, res) => {
  try {
    const thumbnail = req.file.path.replace("/upload/", "/upload/w_400,h_300/");
    const data = { thumbnail, ...req.body };
    const response = await Category.create(data);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateCate = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const thumbnail = req?.file?.path?.replace(
      "/upload/",
      "/upload/w_400,h_300/"
    );
    if (thumbnail) {
      const data = { thumbnail, ...rest };
      await Category.update(data, {
        where: { id },
        individualHooks: true,
      });
    } else {
      await Category.update(rest, {
        where: { id },
      });
    }

    res.status(200).json("Cập nhật danh mục thành công !");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removeCate = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.destroy({
      where: { id },
      include: [{ model: Product }],
      individualHooks: true,
    });
    res.status(200).json("Xóa danh mục thành công");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
