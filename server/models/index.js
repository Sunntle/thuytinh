const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connectDatabase");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./userModel')(sequelize, Sequelize);
db.order = require('./orderModel')(sequelize, Sequelize);


db.order.hasMany(db.user, {
    foreignKey: 'id_user'
})
db.user.belongsTo(db.order, {
    foreignKey: 'id_user', sourceKey: 'id'
})


// Order.belongsTo(User, { foreignKey: 'id_user' });
// User.hasMany(Order, { foreignKey: 'id_user', sourceKey: 'id' });
// sequelize.sync().then((e) => { console.log(e) }).catch((e) => { console.log(e) })

module.exports = db;