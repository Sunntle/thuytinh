const User = require("./userModel");
const Category = require("./categoryModel");
const Notification = require("./notificationModel");
const Product = require("./productModel");
const Order = require("./orderModel");
const Materials = require("./materialsModel");
const Recipes = require("./recipeModel");
const Tables = require("./tableModel");
const Reviews = require("./reviewsModel");
const OrderDetail = require("./orderDetailModel");
const ImageProduct = require("./imageModel");

Reviews.belongsTo(Order, { foreignKey: "id_order" })
Tables.belongsTo(Order, { foreignKey: "id_order", onDelete: "CASCADE", onUpdate: "CASCADE" });
OrderDetail.belongsTo(Order, { foreignKey: "id_order" });
OrderDetail.belongsTo(Product, { foreignKey: "id_product", as: "product" });
Recipes.belongsTo(Product, { foreignKey: "id_product" });
Recipes.belongsTo(Materials, { foreignKey: "id_material" });
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
Product.hasMany(Recipes, { foreignKey: "id_product", sourceKey: "id" });
Materials.hasMany(Recipes, { foreignKey: "id_material", sourceKey: "id" });
Order.hasMany(Tables, { sourceKey: "id", foreignKey: "id_order", onDelete: "CASCADE", onUpdate: "CASCADE" });
Order.hasMany(OrderDetail, { foreignKey: "id_order" });
Order.hasOne(Reviews, { sourceKey: "id", foreignKey: "id_order", onDelete: "CASCADE", onUpdate: "CASCADE" })
User.hasMany(Order, { sourceKey: "id", foreignKey: "id_employee" });




module.exports = { Notification, Tables, User, Order, Category, Product, ImageProduct, Recipes, Materials, OrderDetail, Reviews };

