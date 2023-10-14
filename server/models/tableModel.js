const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const Tables = db.sequelize.define(
    "Tables",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name_table: {
            type: DataTypes.STRING,
        },
        qr_code: {
            type: DataTypes.STRING,
        },
        total_booked: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        position: {
            type: DataTypes.ENUM('Ngoài trời', 'Trong nhà')
        },
        status_table: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
    },
    { timestamps: true }
);
Tables.sync();
module.exports = Tables;
