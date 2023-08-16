const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
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
  },
  {}
);
Recipes.sync({ alter: true });
module.exports = Recipes;
