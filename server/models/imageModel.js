const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const ImageProduct = db.sequelize.define(
  "ImageProduct",
  {
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
ImageProduct.sync();
module.exports = ImageProduct;
