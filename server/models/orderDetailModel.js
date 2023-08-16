const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const bcrypt = require("bcrypt");
require("dotenv").config();

const OrderDetail = db.sequelize.define("order_detail", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_product: {
    type: DataTypes.INTEGER,
  },
  id_order: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  status_food: {
    type: DataTypes.INTEGER,
  },
});
OrderDetail.sync();
module.exports = OrderDetail;
