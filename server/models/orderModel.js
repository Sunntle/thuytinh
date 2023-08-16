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
});
Order.sync();
module.exports = Order;
