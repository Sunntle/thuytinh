const User = require("./userModel");
const Category = require("./categoryModel");
const Notification = require("./notificationModel");
const Order = require("./orderModel");
const Product = require("./productModel");
const Materials = require("./materialsModel");
const Recipes = require("./recipeModel");
const Tables = require("./tableModel");
const Reviews = require("./reviewsModel");
const OrderDetail = require("./orderDetailModel");
const ImageProduct = require("./imageModel");

Recipes.belongsTo(Product, { foreignKey: "id_product" });
Recipes.belongsTo(Materials, { foreignKey: "id_material" });
Order.belongsTo(Tables, { foreignKey: "id_table", onDelete: "CASCADE", onUpdate: "CASCADE" });
Reviews.belongsTo(Order, { foreignKey: "id_order" })
OrderDetail.belongsTo(Order, { foreignKey: "id_order" });
OrderDetail.belongsTo(Product, { foreignKey: "id_product", as: "product" });
Product.belongsTo(Category, {
    foreignKey: "id_category",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Order.belongsTo(User, { foreignKey: "id_employee", as: "employee" });
ImageProduct.belongsTo(Product, { foreignKey: "id_product" });




Product.hasMany(ImageProduct, { foreignKey: "id_product", sourceKey: "id" });
Category.hasMany(Product, {
    foreignKey: "id_category",
    sourceKey: "id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Product.hasMany(OrderDetail, {
    foreignKey: "id_product",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Tables.hasMany(Order, { sourceKey: "id", foreignKey: "id_table", onDelete: "CASCADE", onUpdate: "CASCADE" });
Order.hasMany(OrderDetail, { foreignKey: "id_order" });
Product.hasMany(Recipes, { foreignKey: "id_product", sourceKey: "id" });
Materials.hasMany(Recipes, { foreignKey: "id_material", sourceKey: "id" });
Order.hasOne(Reviews, { sourceKey: "id", foreignKey: "id_order", onDelete: "CASCADE", onUpdate: "CASCADE" })
User.hasMany(Order, { sourceKey: "id", foreignKey: "id_employee", as: "ordersByEmployee" });




module.exports = { Notification, Tables, User, Order, Category, Product, ImageProduct, Recipes, Materials, OrderDetail, Reviews };

