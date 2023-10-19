const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const User = require("./userModel");
const Tables = require("./tableModel");

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
  payment_gateway: {
    type: DataTypes.TINYINT,
    defaultValue: 1
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
<<<<<<< HEAD
// Order.sync()
=======
Order.sync();
>>>>>>> 571f44a2286a29a98c9de53b72d596c14502ce9b
module.exports = Order;
