const {
  Product,
  ImageProduct,
  Recipes,
  Category,
  Materials,
} = require("../models");
const { Op, Sequelize, where } = require("sequelize");
const { getAllUserOnline } = require("../utils/socketHanlers");
exports.list = async (req, res) => {
  try {
    const { _offset, _limit, _sort, _order, q, ...rest } = req.query;
    const subquery = `(SELECT GROUP_CONCAT(url SEPARATOR ';') FROM ImageProducts AS ip WHERE ip.id_product = Product.id)`;
    const query = {
      raw: true,
      attributes: [
        "id",
        "name_product",
        "price",
        "description",
        "status",
        "sold",
        "id_category",
        "discount",
        // [Sequelize.literal(subquery), "imageUrls"],
        // [Sequelize.literal("`Category`.`name_category`"), "categoryName"],
      ],
      include: [
        {
          model: Category,
          attributes: [],
        },
        {
          model: ImageProduct
        }
      ],
    };
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (q) query.where = { name_product: { [Op.substring]: q } };
    if (_sort) query.order = [[_sort, _order]];
    if (rest) {
      const whereConditions = {};
      for (let [index, value] of Object.entries(rest)) {
        const key = index.substring(1);
        const [op, opValue] = value.split("_");
        if (!whereConditions[key]) {
          whereConditions[key] = {};
        }
        whereConditions[key][Op[op]] = opValue;
      }
      query.where = { ...query.where, ...whereConditions };
    }
    const { count, rows } = await Product.findAndCountAll(query);
    res.status(200).json({ total: count, data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getDetail = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Product.findOne({
      where: { id: _id },
      include: [
        { model: ImageProduct, attributes: ["url", "id"] },
        {
          model: Recipes,
          attributes: ["quantity", "descriptionRecipe"],
          include: [
            {
              model: Materials,
              attributes: ["id"],
            },
          ],
        },
        {
          model: Category,
          attributes: ["name_category", "id"],
        },
      ],
    });
    if (!response) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
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
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addItem = async (req, res) => {
  try {
    const { recipe, descriptionRecipe, ...rest } = req.body;
    const img = req.files;
    if (rest.id_category) {
      const response = await Product.create(rest);
      if (response && img && img.length > 0) {
        const data = img.map((file) => ({
          url: file.path.replace("/upload/", "/upload/w_400,h_300/"),
          id_product: response.id,
        }));
        await ImageProduct.bulkCreate(data);
      }
      if (response && recipe != "undefined" && recipe.length > 0) {
        const dataRecipe = JSON.parse(recipe).map((el) => {
          return {
            id_material: el.materials,
            id_product: response.id,
            quantity: el.quantity,
            descriptionRecipe: descriptionRecipe,
          };
        });
        await Recipes.bulkCreate(dataRecipe);
      }
      res.status(201).json(response);
    } else {
      res.status(400).json({ error: "Sản phẩm phải có id của danh mục" });
    }
  } catch (err) {
    console.log(err);
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
      individualHooks: true,
    });
    res.status(200).json("Xóa sản phẩm thành công");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const { query } = req.query;
    const searchedProducts = await Product.findAll({
      where: {
        name_product: {
          [Op.like]: `%${query}%`,
        },
      },
      include: [{ model: ImageProduct, attributes: ["url", "id"] }],
    });
    res.status(200).json({ data: searchedProducts });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
