const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const Product = require("./productModel");
const Recipes = require("./recipeModel");
const Materials = require("./materialsModel");
require("dotenv").config();

const OrderDetail = db.sequelize.define("order_detail", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_product: {
    type: DataTypes.INTEGER,
  },
  id_order: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  status_food: {
    type: DataTypes.INTEGER,
  },
});

OrderDetail.beforeBulkCreate(async (item) => {
  await Promise.all(item.map(async (pr) => {
    const { id_product, quantity } = pr.dataValues;
    return Product.increment("sold", { by: quantity, where: { id: id_product } });
  }));
});
// OrderDetail.sync({ force: true });
module.exports = OrderDetail;
