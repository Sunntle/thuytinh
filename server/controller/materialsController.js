const { Materials, Notification, Product, Recipes } = require("../models");
const { Op, literal } = require("sequelize");
const { unitMasterial } = require("../utils/const");
const { apiQueryRest } = require('../utils/const')

const overMasterial = ["2", "500", "9", "5", "50", "20", "10"];


let notificationSent = false
exports.list = async (req, res) => {

  let query = {
    ...apiQueryRest({...req.query, title: "name_material"}), nest: true
  };
  const { count, rows } = await Materials.findAndCountAll(query);

  const dataChart = await Materials.findAll({
    attributes: ["id", "price", "amount", "name_material", "unit", "image"],
    where: {
      [Op.or]: unitMasterial.map((unit, index) => ({
        unit: unit,
        amount: { [Op.lte]: parseFloat(overMasterial[index]) },
      })),
    },
    raw: true
  });

  if (dataChart.length > 0 && !notificationSent) {
    let created = await Notification.create({
      type: "material",
      description: `Có ${dataChart.length} nguyên liệu sắp hết`
    }, { raw: true }
    );
    let findIdProduct = await Recipes.findAll({
      attributes: ["id_product"],
      where: {
        id_material: { [Op.in]: dataChart.map(item => item.id) }
      },
      group: ['id_product'],
      raw: true
    })
    await Product.update({ status: 3 }, {
      where: {
        id: {
          [Op.in]: findIdProduct.map(item => item.id_product),
        },
        status: {
          [Op.lt]: 3
        }
      }
    });
    let createdProduct = await Notification.create({
      type: "product",
      description: `Có ${findIdProduct.length} sản phẩm gần hết hàng`
    }, { raw: true }
    );
    _io.of("/admin").emit("new message", created);
    _io.of("/admin").emit("new message", createdProduct);
    notificationSent = true
  }

  res.status(200).json({ total: count, data: rows, dataChart });
};
exports.getDetail = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Materials.findOne({
      where: { id: _id },
      raw: true,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addMaterial = async (req, res) => {
  try {
    const img = req.file;
    const response = await Materials.create({
      ...req.body,
      image: img.path.replace("/upload/", "/upload/w_400,h_300/"),
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateMaterial = async (req, res) => {
  try {
    const image = req.file?.path.replace("/upload/", "/upload/w_400,h_300/");
    await Materials.update(
      { ...req.body, image,updatedAt: new Date().toISOString() },
      {
        where: { id: +req.body.id },
      individualHooks: true,
      }
    );
    res.status(200).json("Cập nhật công thức thành công !");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removeMaterial = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Materials.destroy({
      where: { id: _id },
      individualHooks: true,
    });
    res.status(200).json("Xóa công thức thành công");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
