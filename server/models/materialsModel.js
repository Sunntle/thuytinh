const { DataTypes, Op } = require("sequelize");
const db = require("../config/connectDatabase");
const cloudinary = require("cloudinary").v2;
const { unitMasterial, checkQtyMaterials, handleTotalQty } = require("../utils/const");
const Recipes = require("./recipeModel");
const Product = require("./productModel");
const Materials = db.sequelize.define(
  "Materials",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: DataTypes.INTEGER,
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
    },
  },
  { timestamps: true }
);
Materials.beforeDestroy(async (material, options) => {
  const { image } = material.dataValues;
  const public_id = image.split("/").at(-1).split(".")[0];
  await cloudinary.uploader.destroy("NhaHangThuyTinh/" + public_id);
});
Materials.prototype.checkAmountByProduct = async function (pr) {
  const approve = [];
  const over = [];

  const totalQuantity = await handleTotalQty(pr);
  for (const obj of totalQuantity) {
    const [key, val] = Object.entries(obj)[0];
    let product = pr.find(i => i.id === +key)
    let is = await checkQtyMaterials(val, Materials);
    if (is) {
      over.push(product)
      await Product.update({ status: 4 }, { where: { id: +key } });
    } else {
      approve.push(product)
      await Promise.all(val.map(async (item) => (
        await Materials.decrement("amount", { by: item.total, where: { id: item.id_material } })
      )))
    }
  }
  return { approve, over };
}
module.exports = Materials;
