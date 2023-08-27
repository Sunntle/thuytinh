const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const Product = db.sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_product: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING(4000),
    },
    status: {
      type: DataTypes.TINYINT,
    },
    id_category: {
      type: DataTypes.INTEGER,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {}
);
Product.sync();
module.exports = Product;
