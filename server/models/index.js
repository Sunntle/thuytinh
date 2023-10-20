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
const TableByOrder = require("./tableByOrder")



Recipes.belongsTo(Product, { foreignKey: "id_product" });
Recipes.belongsTo(Materials, { foreignKey: "id_material" });
Order.belongsTo(User, { foreignKey: "id_employee", as: "employee" });
Reviews.belongsTo(Order, { foreignKey: "id_order" })
OrderDetail.belongsTo(Order, { foreignKey: "id_order", as: "orderToOrderDetail" });
OrderDetail.belongsTo(Product, { foreignKey: "id_product", as: "product" });
Product.belongsTo(Category, {
    foreignKey: "id_category",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});


ImageProduct.belongsTo(Product, { foreignKey: "id_product" });


Order.hasMany(TableByOrder, { foreignKey: 'orderId', as: "TableByOrder" });
TableByOrder.belongsTo(Order, { foreignKey: 'orderId' });

Tables.hasMany(TableByOrder, { foreignKey: 'tableId', as: "tableOrders" });
TableByOrder.belongsTo(Tables, { foreignKey: 'tableId' })


Order.hasMany(OrderDetail, { foreignKey: "id_order", as: "orderToDetail" });
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
Order.hasOne(Reviews, { sourceKey: "id", foreignKey: "id_order", onDelete: "CASCADE", onUpdate: "CASCADE" })
User.hasMany(Order, { sourceKey: "id", foreignKey: "id_employee" });

Category.sync();
Product.sync();
Notification.sync();
Tables.sync();
User.sync();
Order.sync();
OrderDetail.sync();

ImageProduct.sync();
Materials.sync();

Reviews.sync();
Recipes.sync();
TableByOrder.sync();

module.exports = { TableByOrder, Notification, Tables, User, Order, Category, Product, ImageProduct, Recipes, Materials, OrderDetail, Reviews };