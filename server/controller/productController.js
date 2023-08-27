const { Product, ImageProduct, Recipes } = require("../models");
const { Op, Sequelize } = require("sequelize");
const Materials = require("../models/materialsModel");
exports.list = async (req, res) => {
  try {
    const { _offset, _limit, _sort, _order, q, ...rest } = req.query;
    const subquery = `(SELECT GROUP_CONCAT(url SEPARATOR ';') FROM ImageProducts AS ip WHERE ip.id_product = Product.id)`;
    const query = {
      raw: true,
      attributes: ["id", "name_product", "price", "description", "status", [Sequelize.literal(subquery), "imageUrls"]],
    };
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (q) query.where = { name_product: { [Op.like]: `%${q}%` } };
    if (_sort) query.order = [[_sort, _order]];
    const { count, rows } = await Product.findAndCountAll(query);
    res.status(200).json({ total: count, data: rows });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getDetail = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Product.findOne({
      where: { id: _id },
      include: [
        { model: ImageProduct, attributes: ["url"] },
        {
          model: Recipes,
          attributes: ["quantity"],
          include: [
            {
              model: Materials,
              attributes: ["name_material"],
            },
          ],
        },
      ],
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
    const response = await Product.findAll({
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
    const { recipe, img, descriptionRecipe, ...rest } = req.body;
    if (rest.id_category) {
      const response = await Product.create(rest);
      if (response && img && img.length > 0) {
        const data = img.map((file) => ({
          url: file.url.replace("/upload/", "/upload/w_400,h_300/"),
          id_product: response.id,
        }));
        await ImageProduct.bulkCreate(data);
      }
      if (response && recipe) {
        const dataRecipe = recipe.map((el) => ({
          ...el,
          id_material: el.materials,
          id_product: response.id,
        }));
        await Recipes.bulkCreate(dataRecipe);
      }
      res.status(201).json(response);
    } else {
      res.status(400).json({ error: "Sản phẩm phải có id của danh mục" });
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
