const express = require("express");
const router = express.Router();
const {
  list,
  getRecipeByProduct,
  addRecipe,
  updateRecipe,
  removeRecipe,
  updateRecipeById,
  removeRecipeByProductId
} = require("../controller/recipeController");
router.get("/", list);
router.get("/product/:id", getRecipeByProduct);
router.post("/", addRecipe);
router.put("/", updateRecipe);
router.put("/product/:id", updateRecipeById);
router.delete("/:id", removeRecipe);
router.delete("/product/:id", removeRecipeByProductId);
module.exports = router;
