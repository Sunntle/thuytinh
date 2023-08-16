const User = require("./userModel");
const Order = require("./orderModel");
const Category = require("./categoryModel");
const Product = require("./productModel");
const ImageProduct = require("./imageModel");
const OrderDetail = require("./orderDetailModel");
Order.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(Order, { foreignKey: "id_user", sourceKey: "id" });
Order.hasMany(OrderDetail, { foreignKey: "id_order" });
OrderDetail.belongsTo(Order, { foreignKey: "id_order" });

OrderDetail.belongsTo(Product, { foreignKey: "id_product" })
Product.hasMany(OrderDetail, { foreignKey: "id_product" });

Product.belongsTo(Category, { foreignKey: "id_category" });
Product.hasMany(ImageProduct, { foreignKey: "id_product", as: 'images' });
ImageProduct.belongsTo(Product, { foreignKey: "id_product", as: 'images' });
module.exports = { User, Order, Category, Product, ImageProduct };
