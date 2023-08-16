const User = require("./userModel");
const Order = require("./orderModel");
const Category = require("./categoryModel");
const Product = require("./productModel");
const ImageProduct = require("./imageModel");
const Recipes = require("./recipeModel");
const Materials = require("./materialsModel");
Order.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(Order, { foreignKey: "id_user", sourceKey: "id" });
Order.hasMany(OrderDetail, { foreignKey: "id_order" });
OrderDetail.belongsTo(Order, { foreignKey: "id_order" });

OrderDetail.belongsTo(Product, { foreignKey: "id_product" })
Product.hasMany(OrderDetail, { foreignKey: "id_product" });

Product.belongsTo(Category, { foreignKey: "id_category" });
Product.hasMany(ImageProduct, { foreignKey: "id_product", sourceKey: "id" });
Product.hasMany(Recipes, { foreignKey: "id_product", sourceKey: "id" });
ImageProduct.belongsTo(Product, { foreignKey: "id_product" });
Materials.hasMany(Recipes, { foreignKey: "id_material", sourceKey: "id" });
Recipes.belongsTo(Product, { foreignKey: "id_product" });
Recipes.belongsTo(Materials, { foreignKey: "id_material" });
module.exports = { User, Order, Category, Product, ImageProduct, Recipes, Materials };
