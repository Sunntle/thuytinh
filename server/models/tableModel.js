const { DataTypes, Op } = require("sequelize");
const db = require("../config/connectDatabase");
const Tables = db.sequelize.define(
    "tables",
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
Tables.prototype.updateStatusTable = async (update, idArr, check) => {
    await Tables.update(update, { where: { id: { [Op.in]: idArr } } });
    if (update.status_table === 1) {
        await Tables.increment("total_booked", { by: 1, where: { id: { [Op.in]: idArr } } })
    }
    let data = await Tables.findAll({ where: { id: { [Op.in]: idArr } }, raw: true })
    _io.of("/admin").emit("status table", data);
    if (+update.status_table === 0) {
        !check && _io.of("/client").emit("complete-payment", { data: idArr[0] });
    }

}
Tables.prototype.checkStatus = async (arr, status_table, token) => {
    const list = await Tables.findAll({
        where: {
            [Op.or]: {
                id: { [Op.in]: arr },
                status_table,
                token: { [Op.substring]: token }
            }

        }, raw: true
    });
    return list.length === 0 ? true : false
}


module.exports = Tables;
