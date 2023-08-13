const User = require("./userModel");
const Order = require("./orderModel");
const Category = require("./categoryModel");
const Product = require("./productModel");
const ImageProduct = require("./imageModel");
Order.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(Order, { foreignKey: "id_user", sourceKey: "id" });

Product.belongsTo(Category, { foreignKey: "id_category" });
Product.hasMany(ImageProduct, { foreignKey: "id_product", sourceKey: "id" });
ImageProduct.belongsTo(Product, { foreignKey: "id_product" });
module.exports = { User, Order, Category, Product, ImageProduct };
