const { DataTypes, Op } = require("sequelize");
const db = require("../config/connectDatabase");
const cloudinary = require("cloudinary").v2;
const { unitMasterial, checkQtyMaterials, handleTotalQty, getQtyMaterialByProduct, checkOverMaterial } = require("../utils/const");
const Recipes = require("./recipeModel");
const Product = require("./productModel");
const Materials = db.sequelize.define(
  "materials",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    name_material: {
      type: DataTypes.STRING,
    },
    unit: {
      type: DataTypes.ENUM(unitMasterial)
    },
    image: {
      type: DataTypes.STRING(1000),
    }
  },
  { timestamps: true }
);


Materials.beforeDestroy(async (material, options) => {
  const { image } = material.dataValues;
  const public_id = image.split("/").at(-1).split(".")[0];
  await cloudinary.uploader.destroy("NhaHangThuyTinh/" + public_id);
});
Materials.prototype.checkAmountByProduct = async function (products) {
  const approve = [];
  const over = [];
  const arr = [];
  for (const product of products) {
    const val = await getQtyMaterialByProduct(product);
    const checkQty = await checkQtyMaterials(val, Materials);
    if (checkQty) {
      arr.push(val);
      approve.push(product)
    } else {
      over.push(product)
    }
  }
  if (products.length === approve.length) {
    for (const val of arr) {
      await Promise.all(val.map(async (item) => {
        await Materials.decrement("amount", { by: item.total, where: { id: item.id_material } })
        await checkOverMaterial(Materials, item.id_material)
      }))
    }
  }

  return { approve, over };
}
module.exports = Materials;
