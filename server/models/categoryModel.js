const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const Category = db.sequelize.define(
  "Category",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_category: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING(1000),
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {}
);
Category.sync();
module.exports = Category;
