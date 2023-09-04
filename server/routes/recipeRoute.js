const express = require("express");
const router = express.Router();
const {
  list,
  getRecipeByProduct,
  addRecipe,
  updateRecipe,
  removeRecipe,
  updateRecipeById,
} = require("../controller/recipeController");
router.get("/", list);
router.get("/product/:id", getRecipeByProduct);
router.post("/", addRecipe);
router.put("/:id", updateRecipe);
router.put("/product/:id", updateRecipeById);
router.delete("/:id", removeRecipe);
module.exports = router;
