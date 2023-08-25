const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
const recipeRouter = require("./recipeRoute");
const materialsRouter = require("./materialsRoute");
const orderRouter = require("./orderRouter");
const imageRouter = require("./imageRoute");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/recipe", recipeRouter);
  app.use("/api/material", materialsRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/image", imageRouter);
};
module.exports = initRoutes;
