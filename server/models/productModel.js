const { DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const ImageProduct = require("./imageModel");
const Category = require("./categoryModel");
const cloudinary = require("cloudinary").v2;
const Product = db.sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_product: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING(4000),
    },
    status: {
      type: DataTypes.TINYINT,
    },
    id_category: {
      type: DataTypes.INTEGER,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {}
);
Product.beforeDestroy(async (product, options) => {
  const relatedImages = await ImageProduct.findAll({
    where: { id_product: product.dataValues.id },
  });
  for (const image of relatedImages) {
    const public_id = image.dataValues.url.split("/").at(-1).split(".")[0];
    await cloudinary.uploader.destroy("NhaHangThuyTinh/" + public_id);
  }
});
// Product.sync();
module.exports = Product;
