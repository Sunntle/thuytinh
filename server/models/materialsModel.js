const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const Materials = db.sequelize.define(
  "Materials",
  {
    // Model attributes are defined here
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
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING(1000),
    },
  },
  {}
);
Materials.sync();
module.exports = Materials;
