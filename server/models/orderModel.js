// const { Sequelize, DataTypes } = require("sequelize");
// const db = require("../config/connectDatabase");
const bcrypt = require('bcrypt');
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


module.exports = OrderTable;
