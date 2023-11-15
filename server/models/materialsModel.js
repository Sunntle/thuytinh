const { DataTypes, Op } = require("sequelize");
const db = require("../config/connectDatabase");
const cloudinary = require("cloudinary").v2;
const { unitMasterial, checkQtyMaterials, handleTotalQty, getQtyMaterialByProduct } = require("../utils/const");
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

  for (const product of products) {
    let val = await getQtyMaterialByProduct(product);
    let checkQty = await checkQtyMaterials(val, Materials);
    if (checkQty) {
      approve.push(product)
      await Promise.all(val.map(async (item) => (
        await Materials.decrement("amount", { by: item.total, where: { id: item.id_material } })
      )))
    } else {
      over.push(product)
      await Product.update({ status: 4 }, { where: { id: product.id } });
    }
  }

  return { approve, over };
}
module.exports = Materials;
