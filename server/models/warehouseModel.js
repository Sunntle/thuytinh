const { DataTypes, Op } = require("sequelize");
const db = require("../config/connectDatabase");

const Warehouse = db.sequelize.define(
  "warehouses",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    materialId: {
      type: DataTypes.INTEGER,
    },
    amount_import: {
      type: DataTypes.INTEGER,
    },
    price_import: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);
module.exports = Warehouse;