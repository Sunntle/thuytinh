const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const Image = db.sequelize.define(
  "Image",
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
Image.sync({ alter: true });
module.exports = Image;
