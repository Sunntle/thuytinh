const User = require("./userModel");
const Order = require("./orderModel");
const Category = require("./categoryModel");
const Product = require("./productModel");
const ImageProduct = require("./imageModel");
const Recipes = require("./recipeModel");
const Materials = require("./materialsModel");
const OrderDetail = require("./orderDetailModel");
const Tables = require('./tableModel');
const Reviews = require('./reviewsModel')
Product.hasMany(OrderDetail, { foreignKey: "id_product", onDelete: "CASCADE", onUpdate: "CASCADE" });
Product.belongsTo(Category, { foreignKey: "id_category", onDelete: "CASCADE", onUpdate: "CASCADE" });
Product.hasMany(ImageProduct, { foreignKey: "id_product", sourceKey: "id" });

Product.hasMany(Recipes, { foreignKey: "id_product", sourceKey: "id" });
ImageProduct.belongsTo(Product, { foreignKey: "id_product" });
Materials.hasMany(Recipes, { foreignKey: "id_material", sourceKey: "id" });
Recipes.belongsTo(Product, { foreignKey: "id_product" });
Recipes.belongsTo(Materials, { foreignKey: "id_material" });

Order.belongsTo(Tables, { foreignKey: "id_table", onDelete: "CASCADE", onUpdate: "CASCADE" });
Tables.hasMany(Order, { sourceKey: "id", foreignKey: "id_table", onDelete: "CASCADE", onUpdate: "CASCADE" });

Order.hasMany(OrderDetail, { foreignKey: "id_order" });
Order.hasOne(Reviews, {sourceKey: "id", foreignKey: "id_order", onDelete: "CASCADE", onUpdate: "CASCADE"})
OrderDetail.belongsTo(Order, { foreignKey: "id_order" });
OrderDetail.belongsTo(Product, { foreignKey: "id_product", as: 'product' });

User.hasMany(Order, { sourceKey: "id", foreignKey: "id_user", as: "ordersByUser" });
User.hasMany(Order, { sourceKey: "id", foreignKey: "id_employee", as: "ordersByEmployee" });

Order.belongsTo(User, { foreignKey: "id_employee", as: "employee" });
Order.belongsTo(User, { foreignKey: "id_user", as: "user" });

Reviews.belongsTo(Order, {foreignKey: "id_order"})
module.exports = { Tables, User, Order, Category, Product, ImageProduct, Recipes, Materials, OrderDetail, Reviews };
