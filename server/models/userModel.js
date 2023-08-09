const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const User = db.sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {}
);
User.sync();
module.exports = User;
