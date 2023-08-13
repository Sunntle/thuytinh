const { Product, ImageProduct } = require("../models");
const { Op } = require("sequelize");
exports.list = async (req, res) => {
  try {
    const { _offset, _limit, _sort, _order, q, ...rest } = req.query;
    const query = { raw: true, include: [{ model: ImageProduct, attributes: ["url"] }] };
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
    const response = await Product.findOne({
      where: { id: _id },
      include: [{ model: ImageProduct, attributes: ["url"] }],
    });
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
    const response = await Product.findOne({
      where: { id_category: _id },
      include: [{ model: ImageProduct, attributes: ["url"] }],
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addItem = async (req, res) => {
  try {
    const { id_category } = req.body;
    const images = req.files;
    if (id_category && images.length > 0) {
      const response = await Product.create(req.body);
      if (response) {
        const data = images.map((file) => ({
          url: file.path.replace("/upload/", "/upload/w_600,h_800/"),
          id_product: response.id,
        }));
        await ImageProduct.bulkCreate(data);
        res.status(201).json(response);
      }
    } else {
      res.status(400).json({ error: "Sản phẩm phải có id của danh mục và hình ảnh" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Product.update(req.body, {
      where: { id: _id },
    });
    res.status(200).json("Cập nhật sản phẩm thành công!");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removeProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Product.destroy({
      where: { id: _id },
    });
    res.status(200).json("Xóa sản phẩm thành công");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
