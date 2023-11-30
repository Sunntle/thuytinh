const { Materials, Notification, Product, Recipes, Warehouse } = require("../models");
const { Op, literal } = require("sequelize");
const { unitMasterial, overMasterial } = require("../utils/const");
const { apiQueryRest } = require('../utils/const')
const asyncHandler = require("express-async-handler");



let notificationSent = false
exports.list = async (req, res) => {
  let query = {
    ...apiQueryRest({ ...req.query, title: "name_material" }), nest: true,
    include: { model: Warehouse, attributes: ["price_import"] },
    order: [[{ model: Warehouse }, 'createdAt', 'DESC']],
    subQuery: false
  };

  const { count, rows } = await Materials.findAndCountAll(query);
  const listImport = await Warehouse.findAll({ order: [['createdAt', 'DESC']], include: { model: Materials, attributes: ["name_material", "unit"] } })

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
    await Notification.create({
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
          }, status: { [Op.lt]: 3 }
        }
      });
      await Notification.create({
        type: "product",
        description: `Có ${findIdProduct.length} sản phẩm gần hết hàng`
      });
    }
    notificationSent = true
  }

  res.status(200).json({ total: count, data: rows, dataChart, listImport });
};
exports.getDetail = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Materials.findOne({
      include: { model: Warehouse },
      where: { id: _id },
      order: [[{ model: Warehouse }, 'createdAt', 'DESC']],
      subQuery: false
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
    const { amount, id } = response.dataValues;
    await Warehouse.create({
      materialId: id,
      amount_import: amount,
      price_import: req.body.price,
    })
    await Notification.create({
      type: "material",
      description: `Vừa thêm nguyên liệu ${req.body.name_material}`
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
    await Notification.create({
      type: "material",
      description: `Vừa cập nhật nguyên liệu ${req.body.name_material}`
    })
    res.status(200).json("Cập nhật công thức thành công !");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removeMaterial = async (req, res) => {
  try {
    const _id = req.params.id;
    await Notification.create({
      type: "material",
      description: `Vừa xóa 1 nguyên liệu`
    })
    await Materials.destroy({
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
  const { amount_import, price, materialId, name_material } = req.body;
  await Warehouse.create({ materialId, price_import: price, amount_import }).catch(err => console.log(err))
  await Materials.increment("amount", { by: amount_import, where: { id: materialId } }).catch(err => console.log(err))
  await Notification.create({
    type: "material",
    description: `Vừa nhập nguyên liệu ${name_material}`
  })
  res.status(200).json("Đã thêm vào kho thành công");
})
