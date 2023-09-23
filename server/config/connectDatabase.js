const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("nhahang", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  timezone: "+07:00",
  port: 3309
});
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = { connectDatabase, sequelize };
