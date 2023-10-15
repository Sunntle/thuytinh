const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
const recipeRouter = require("./recipeRoute");
const materialsRouter = require("./materialsRoute");
const orderRouter = require('./orderRouter');
const tableRouter = require("./tableRoute");
const imageRouter = require('./imageRoute');
const reviewsRouter = require('./reviewsRoute')
const paymentRouter = require('./paymentRoute')
const { notFound, errHandler } = require("../middlewares/err");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/recipe", recipeRouter);
  app.use("/api/material", materialsRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/table", tableRouter);
  app.use("/api/image", imageRouter);
  app.use("/api/review", reviewsRouter)
  app.use("/api/payment", paymentRouter)
  app.use(notFound, errHandler)
};
module.exports = initRoutes;
