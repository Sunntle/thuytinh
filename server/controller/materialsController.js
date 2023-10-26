const { Materials, Notification, Product, Recipes, Warehouse } = require("../models");
const { Op, literal } = require("sequelize");
const { unitMasterial } = require("../utils/const");
const { apiQueryRest } = require('../utils/const')
const asyncHandler = require("express-async-handler");
const overMasterial = ["2", "500", "9", "5", "50", "20", "10"];


let notificationSent = false
exports.list = async (req, res) => {

  let query = {
    ...apiQueryRest({ ...req.query, title: "name_material" }), nest: true,
    include: { model: Warehouse, attributes: ["price_import"], order: [["createdAt", "DESC"]], limit: 1 },
  };
  const { count, rows } = await Materials.findAndCountAll(query);

  const dataChart = await Materials.findAll({
    attributes: ["id", "amount", "name_material", "unit", "image"],
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
    if (findIdProduct.length > 0) {
      await Product.update({ status: 3 }, {
        where: {
          id: {
            [Op.in]: findIdProduct.map(item => item.id_product),
          }, status: {
            [Op.lt]: 3
          }
        }
      });
      let createdProduct = await Notification.create({
        type: "product",
        description: `Có ${findIdProduct.length} sản phẩm gần hết hàng`
      }, { raw: true }
      );
      _io.of("/admin").emit("new message", createdProduct);
    }

    _io.of("/admin").emit("new message", created);
    notificationSent = true
  }

  res.status(200).json({ total: count, data: rows, dataChart });
};
exports.getDetail = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Materials.findOne({
      include: { model: Warehouse, order: [["createdAt", "DESC"]], limit: 1 },
      where: { id: _id }
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
    const { amount, id, price } = response.dataValues;
    await Warehouse.create({
      materialId: id,
      amount_import: amount,
      price_import: req.body.price,
    })
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateMaterial = async (req, res) => {
  try {
    const image = req.file?.path.replace("/upload/", "/upload/w_400,h_300/");
    await Materials.update(
      { ...req.body, image },
      {
        where: { id: +req.body.id },
        individualHooks: true,
      }
    );
    await Warehouse.update(
      { price_import: req.body.price },
      { where: { id: req.body.id_warehouse } }
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

exports.importWarehouse = asyncHandler(async (req, res) => {
  const { amount_import, price, materialId } = req.body;
  await Warehouse.create({ materialId, price_import: price, amount_import }).catch(err => console.log(err))
  await Materials.increment("amount", { by: amount_import, where: { id: materialId } }).catch(err => console.log(err))
  res.status(200).json("Đã thêm vào kho thành công");
})
