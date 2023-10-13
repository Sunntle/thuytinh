const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const cloudinary = require("cloudinary").v2;

const unitMasterial = ["kg", "gram", "phần", "lít", "quả", "con", "thùng"];
const Materials = db.sequelize.define(
  "Materials",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    name_material: {
      type: DataTypes.STRING,
    },
    unit: {
      type: DataTypes.ENUM(unitMasterial)
    },
    image: {
      type: DataTypes.STRING(1000),
    },
  },
  { timestamps: true }
);
Materials.beforeDestroy(async (material, options) => {
  const { image } = material.dataValues;
  const public_id = image.split("/").at(-1).split(".")[0];
  await cloudinary.uploader.destroy("NhaHangThuyTinh/" + public_id);
});
Materials.sync();
module.exports = Materials;
