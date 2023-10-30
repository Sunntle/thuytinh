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
    await Tables.update({ status_table }, { where: { id: { [Op.in]: arr } } });
    console.log("updateStatusTable", updateStatusTable)
    if (status_table === 1) {
        await Tables.increment("total_booked", { by: 1, where: { id: { [Op.in]: arr } } })
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

Tables.afterBulkUpdate(async (data) => {
    _io.of("/admin").emit("status table", data.attributes);
});


module.exports = Tables;
