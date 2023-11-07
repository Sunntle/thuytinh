const {
  Product,
  ImageProduct,
  Recipes,
  Category,
  Materials,
} = require("../models");
const { Op } = require("sequelize");

exports.list = async (req, res) => {
  try {
    const { _offset, _limit, _sort, _order, q, ...rest } = req.query;
    const query = {
      attributes: [
        "id",
        "name_product",
        "price",
        "description",
        "status",
        "sold",
        "id_category",
        "discount",
      ],
      include: [
        {
          model: Category,
          attributes: ["name_category"],
        },
        {
          model: ImageProduct,
          attributes: ["url"],
        },
        {
          model: Recipes,
          attributes: ["quantity"],
          include: [{ model: Materials, attributes: ["amount"] }],
        },
      ],
      distinct: true,
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
    rows.length > 0 &&
      rows.forEach((product) => {
        const { Recipes } = product;
        if (Recipes.length == 0) return (product.dataValues.amount = 0);
        const arrCount = [];
        for (const recipe of Recipes) {
          const { Material } = recipe;
          const countProduct =
            Material.amount > 0 &&
            recipe.quantity > 0 &&
            Math.floor(Material.amount / recipe.quantity);
          if (countProduct < 1 || countProduct == false) {
            arrCount.push(0);
            break;
          }
          arrCount.push(countProduct);
        }
        product.dataValues.amount = Math.min(...arrCount);
      });
    res.status(200).json({ total: count, data: rows, success: true });
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
              attributes: ["id", "amount"],
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
    const { Recipes: recipes } = response;
    if (recipes.length !== 0) {
      const arrCount = [];
      for (const recipe of recipes) {
        const { Material } = recipe;
        const countProduct =
          Material.amount > 0 &&
          recipe.quantity > 0 &&
          Math.floor(Material.amount / recipe.quantity);
        if (countProduct < 1 || countProduct == false) {
          arrCount.push(0);
          break;
        }
        arrCount.push(countProduct);
      }
      response.dataValues.amount = Math.min(...arrCount);
    } else {
      response.dataValues.amount = 0;
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getByCategory = async (req, res) => {
  const _id = req.params.id;
  try {
    const { count, rows } = await Product.findAndCountAll({
      where: { id_category: _id },
      include: [
        { model: ImageProduct, attributes: ["url"] },
        {
          model: Recipes,
          attributes: ["quantity"],
          include: [{ model: Materials, attributes: ["amount"] }],
        },
      ],
    });
    if(count == 0)  res.status(200).json({ data: rows, total: count, success: true });
    rows.forEach((product) => {
      const { Recipes } = product;
      if (Recipes.length == 0) return
      const arrCount = [];
      for (const recipe of Recipes) {
        const { Material } = recipe;
        const countProduct = Material.amount > 0 && recipe.quantity > 0 && Math.floor(Material.amount / recipe.quantity);
        if (countProduct < 1 || countProduct == false) {
          arrCount.push(0)
          break;
        };
        arrCount.push(countProduct);
      }
      product.dataValues.amount = Math.min(...arrCount);
    });
    res.status(200).json({ data: rows, total: count, success: true });
  } catch (err) {
    console.log(err);
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
