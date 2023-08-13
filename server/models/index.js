const User = require("./userModel");
const Order = require("./orderModel");
const Category = require("./categoryModel");
const Product = require("./productModel");
const Image = require("./imageModel");
Order.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(Order, { foreignKey: "id_user", sourceKey: "id" });

Product.belongsTo(Category, { foreignKey: "id_category" });
Product.hasMany(Image, { foreignKey: "id_product", sourceKey: "id" });
Category.hasMany(Product, { foreignKey: "id_category", sourceKey: "id" });
Image.belongsTo(Product, { foreignKey: "id_product" });
module.exports = { User, Order, Category, Product, Image };
