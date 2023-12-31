const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/connectDatabase");
const bcrypt = require("bcryptjs");
const { destroyImg } = require("../utils/cloud");
require("dotenv").config();
const hashUserPassword = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

const User = db.sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING(1000),
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING(13),
  },
  black_list: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "R1",
  },
  avatar: {
    type: DataTypes.STRING(1000),
    defaultValue: process.env.AVATAR,
  },
  refreshToken: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
});

User.beforeUpdate(async (User) => {
  if (User.changed("avatar")) {
    await destroyImg(User._previousDataValues.avatar);
  }
});
User.beforeDestroy(async (User) => {
  await destroyImg(User.avatar);
})
User.beforeCreate(async (user) => {
  await hashUserPassword(user);
});
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    await hashUserPassword(user);
  }
});
User.prototype.comparePassword = async function (p) {
  try {
    return await bcrypt.compare(p, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
// User.sync()
module.exports = User;
