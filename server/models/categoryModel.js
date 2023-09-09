const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const { destroyImg } = require("../utils/cloud");
const Category = db.sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_category: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING(1000),
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {}
);

Category.beforeUpdate(async (cat) => {
  if (cat.changed("thumbnail")) {
    await destroyImg(cat._previousDataValues.thumbnail);
  }
});
Category.beforeDestroy(async (cat) => {
  await destroyImg(cat.thumbnail);
})
Category.sync();
module.exports = Category;
