const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const Reviews = db.sequelize.define(
  "Reviews",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(1000)
    },
    id_order: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.TINYINT,
      validate: {
        max: 5,
        min: 0
      }
    },
  },
  {}
);
// Reviews.sync()
module.exports = Reviews;
