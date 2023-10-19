const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const TableByOrder = db.sequelize.define(
    "TableByOrder",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        tableId: {
            type: DataTypes.INTEGER
        },
        orderId: {
            type: DataTypes.INTEGER
        }
    },
    { timestamps: true }
);
// TableByOrder.sync()
module.exports = TableByOrder;