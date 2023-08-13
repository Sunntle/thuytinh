const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const ImageProduct = db.sequelize.define(
  "ImageProduct",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(4000),
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
  },
  {}
);
ImageProduct.sync({ alter: true });
module.exports = ImageProduct;
