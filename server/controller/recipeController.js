const { Recipes, Product, ImageProduct, Materials } = require("../models");
const asyncHandler = require('express-async-handler');
const { Op } = require("sequelize");
const { apiQueryRest } = require('../utils/const')
exports.list = async (req, res) => {
  let query = {
    attributes: ["quantity", "id", "descriptionRecipe"],
    include: [{ model: Product, include: { model: ImageProduct, attributes: ["url"] } }, { model: Materials, attributes: ["name_material", "amount", "unit", "id"] }],
    ...apiQueryRest({ ...req.query, title: "descriptionRecipe" }), nest: true
  };

  let recipes = await Recipes.findAll(query);
  const result = recipes.reduce((con, cur) => {
    const { product, quantity, id, material, descriptionRecipe } = cur.toJSON();
    const existingProduct = con.find((item) => item.product.id === product.id);
    const mate = { quantity, id_recipe: id, ...material, descriptionRecipe: descriptionRecipe };
    if (existingProduct) {
      existingProduct.quantity += quantity;
      existingProduct.materials.push(mate);
    } else {
      con.push({
        product: product,
        quantity: cur.quantity,
        materials: [mate]
      });
    }
    return con;
  }, []);
  res.status(200).json(result);
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
    const is = await Recipes.findOne({ where: { 'id_product': req.body[0]['id_product'] }, raw: true });
    if (is) return res.status(404).json({ error: 'Sản phẩm đã có công thức' });
    await Recipes.bulkCreate(req.body);
    res.status(201).json('Thành công');
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateRecipe = asyncHandler(async (req, res) => {
  const { addedItems, updatedItems, removedItems } = req.body;
  if (addedItems?.length > 0) {
    await Recipes.bulkCreate(addedItems);
  }
  if (updatedItems?.length > 0) {
    const promises = updatedItems.map(item => Recipes.update({ quantity: item.quantity, id_material: item.id_material }, { where: { id: item.id } }));
    await Promise.all(promises);
  };
  if (removedItems?.length > 0) {
    await Recipes.destroy({ where: { id: removedItems } });
  }
  res.status(200).json("Cập nhật công thức thành công !");
});
exports.removeRecipe = asyncHandler(async (req, res) => {
  await Recipes.destroy({
    where: { id_product: req.params.id }
  })
  res.status(200).json("Xóa công thức thành công");
})
