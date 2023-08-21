const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Order = db.sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.INTEGER,
  },
  payment: {
    type: DataTypes.STRING,
  },
  total: {
    type: DataTypes.INTEGER,
  },
  id_user: {
    type: DataTypes.INTEGER,
  },
  id_employee: {
    type: DataTypes.INTEGER,
  },
  id_table: {
    type: DataTypes.INTEGER,
  },
  date_order: {
    type: "TIMESTAMP",
  }
}, { timestamps: true });
Order.sync();
module.exports = Order;
