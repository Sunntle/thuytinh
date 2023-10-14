const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const Product = require("./productModel");
const cloudinary = require("cloudinary").v2;
const ImageProduct = db.sequelize.define(
  "ImageProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(4000),
    },
    id_product: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);
ImageProduct.beforeDestroy(async (img, options) => {
  const public_id = img.dataValues.url.split("/").at(-1).split(".")[0];
  await cloudinary.uploader.destroy("NhaHangThuyTinh/" + public_id);
});
ImageProduct.sync();
module.exports = ImageProduct;
