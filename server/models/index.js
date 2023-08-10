const User = require('./userModel');
const Order = require('./orderModel');

Order.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(Order, { foreignKey: 'id_user', sourceKey: 'id' });
module.exports = { User, Order };