<<<<<<< HEAD
// const { Sequelize, DataTypes } = require("sequelize");
// const db = require("../config/connectDatabase");
const bcrypt = require('bcrypt');
=======
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const bcrypt = require("bcrypt");
>>>>>>> 453be5c35b418489bdb40844218050dadfcbe5d1
require("dotenv").config();
const OrderTable = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "orders",
        {
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
            id_table: {
                type: DataTypes.INTEGER,
            },
        }
    );
    return Order
}

<<<<<<< HEAD

module.exports = OrderTable;
=======
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
  id_table: {
    type: DataTypes.INTEGER,
  },
});
Order.sync({ alter: true });
module.exports = Order;
>>>>>>> 453be5c35b418489bdb40844218050dadfcbe5d1
