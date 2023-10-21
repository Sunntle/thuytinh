const { DataTypes, Op } = require("sequelize");
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
        token: {
            type: DataTypes.STRING,
        },
        position: {
            // in: trong nhà , out : ngoài nhà
            type: DataTypes.ENUM('in', 'out')
        },
        status_table: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
    },
    { timestamps: true }
);
Tables.prototype.updateStatusTable = async (arr, status_table) => {
    await Tables.update({ status_table }, { where: { id: { [Op.in]: arr } } })
}
Tables.prototype.checkStatus = async (arr, status_table) => {
    const list = await Tables.findAll({
        where: {
            id: { [Op.in]: arr },
            status_table
        }, raw: true
    });
    return list.length === 0 ? true : false
}
// Tables.sync()
module.exports = Tables;
