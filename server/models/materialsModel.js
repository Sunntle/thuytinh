const { DataTypes, Op } = require("sequelize");
const db = require("../config/connectDatabase");
const cloudinary = require("cloudinary").v2;
const { unitMasterial } = require("../utils/const");
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
  // let products = pr.map(item => ({ id: item.id, qtyOrder: item.quantity }));
  let recipes = await Recipes.findAll({ where: { id_product: { [Op.in]: pr.map(i => i.id) } }, raw: true });

  const totalQuantity = pr.map(order => {
    const totalQuantities = recipes
      .filter(recipe => recipe.id_product === order.id)
      .map(recipe => ({
        id_material: recipe.id_material,
        total: recipe.quantity * order.quantity,
        id_product: order.id
      }));
    return { [order.id]: totalQuantities };
  });

  const checkQty = async (data) => {
    let checkOver = await Materials.findAll({
      attributes: ["id", "amount"], where: {
        [Op.or]: data.map((item) => ({
          id: item.id_material,
          amount: { [Op.lt]: parseFloat(item.total) }
        }))
      }, raw: true
    });
    return checkOver.length > 0;
  }

  for (const obj of totalQuantity) {
    const [key, val] = Object.entries(obj)[0];
    let product = pr.find(i => i.id === +key)
    let is = await checkQty(val);
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
