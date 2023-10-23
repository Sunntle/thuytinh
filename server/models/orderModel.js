const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");

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
  payment_gateway: {
    type: DataTypes.TINYINT,
    defaultValue: 1
  },
  transaction_id: {
    type: DataTypes.STRING
  },
  transaction_date: {
    type: DataTypes.STRING
  },
  total: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1
  },
  id_employee: {
    type: DataTypes.INTEGER,
  }
}, { timestamps: true });
// Order.sync()
module.exports = Order;