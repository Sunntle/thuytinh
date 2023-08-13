const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
};
module.exports = initRoutes;
