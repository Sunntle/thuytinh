const userRouter = require("./userRoute");
const productRouter = require("./productRoute");
const categoryRouter = require("./categoryRoute");
const recipeRouter = require("./recipeRoute");
const materialsRouter = require("./materialsRoute");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/recipe", recipeRouter);
  app.use("/api/material", materialsRouter);
};
module.exports = initRoutes;
