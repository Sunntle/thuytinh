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
        },
        party_size: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.ENUM("pending", "confirmed", "canceled")
        },
        dining_option: {
            type: DataTypes.ENUM("reservation", "eat-in")
        },
        dining_time: {
            type: DataTypes.STRING()
        },
        note: {
            type: DataTypes.STRING()
        }
    },
    { timestamps: true }
);

module.exports = TableByOrder;