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
const TableByOrder = require("./tableByOrder");
const Warehouse = require("./warehouseModel");
const { sequelize } = require("../config/connectDatabase");

Recipes.belongsTo(Product, {
  foreignKey: "id_product",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Recipes.belongsTo(Materials, {
  foreignKey: "id_material",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Order.belongsTo(User, {
  foreignKey: "id_employee",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Reviews.belongsTo(Order, {
  foreignKey: "id_order",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderDetail.belongsTo(Order, {
  foreignKey: "id_order",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
OrderDetail.belongsTo(Product, {
  foreignKey: "id_product",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Product.belongsTo(Category, {
  foreignKey: "id_category",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ImageProduct.belongsTo(Product, {
  foreignKey: "id_product",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Order.hasMany(TableByOrder, {
  foreignKey: "orderId",
});
TableByOrder.belongsTo(Order, {
  foreignKey: "orderId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Tables.hasMany(TableByOrder, { foreignKey: "tableId" });
TableByOrder.belongsTo(Tables, {
  foreignKey: "tableId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Order.hasMany(OrderDetail, {
  sourceKey: "id",
  foreignKey: "id_order",
});
Product.hasMany(ImageProduct, {
  foreignKey: "id_product",
  sourceKey: "id",
});
Category.hasMany(Product, {
  foreignKey: "id_category",
});
Product.hasMany(OrderDetail, {
  foreignKey: "id_product",
});

Product.hasMany(Recipes, { foreignKey: "id_product", sourceKey: "id" });
Materials.hasMany(Recipes, { foreignKey: "id_material", sourceKey: "id" });
Order.hasOne(Reviews, {
  sourceKey: "id",
  foreignKey: "id_order",
});
User.hasMany(Order, { sourceKey: "id", foreignKey: "id_employee" });

Materials.hasMany(Warehouse, { foreignKey: "materialId", sourceKey: "id" });
Warehouse.belongsTo(Materials, {
  foreignKey: "materialId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
async function synchronizeModels() {
  try {
    await sequelize.sync();
    // User.findOrCreate({
    //   where: { email: "admin@gmail.com" },
    //   defaults: {
    //     name: "Admin",
    //     password: "12345",
    //     email: "admin@gmail.com",
    //     phone: "0335898646",
    //     black_list: 0,
    //     role: "R4"
    //   }
    // })
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
}

synchronizeModels();
module.exports = {
  Warehouse,
  TableByOrder,
  Notification,
  Tables,
  User,
  Order,
  Category,
  Product,
  ImageProduct,
  Recipes,
  Materials,
  OrderDetail,
  Reviews,
  synchronizeModels
};

