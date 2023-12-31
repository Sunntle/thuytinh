const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");

const Notification = db.sequelize.define(
    "notifications",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    { timestamps: true }
);

Notification.afterCreate(async (info) => {
    _io.of("/admin").emit("new message", info.dataValues)
});
module.exports = Notification;
