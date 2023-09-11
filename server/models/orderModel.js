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
    defaultValue: null
  },
  phone: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  payment: {
    type: DataTypes.STRING,
    defaultValue: 1
  },
  total: {
    type: DataTypes.INTEGER,
  },
  id_user: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  id_employee: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  id_table: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  date_order: {
    type: "TIMESTAMP",
    defaultValue: null
  }
}, { timestamps: true });
Order.sync();
module.exports = Order;
