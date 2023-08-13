const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const { notFount, errHandler } = require("../middlewares/err");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  // app.use(notFount)
  // app.use(errHandler)
};
module.exports = initRoutes;
