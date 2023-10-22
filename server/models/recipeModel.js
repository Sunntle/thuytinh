const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const Materials = require("./materialsModel");
const Recipes = db.sequelize.define(
  "Recipes",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_material: {
      type: DataTypes.INTEGER,
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    descriptionRecipe: {
      type: DataTypes.STRING(1000),
    },
  },
  { timestamps: true }
);

module.exports = Recipes;
