const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
};
module.exports = initRoutes;
