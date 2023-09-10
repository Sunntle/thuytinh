const express = require("express");
const router = express.Router();
const { list, getRecipeByProduct, addRecipe, updateRecipe, removeRecipe } = require("../controller/recipeController");
router.get("/", list);
router.get("/product/:id", getRecipeByProduct);
router.post("/", addRecipe);
router.put("/", updateRecipe);
router.delete("/:id", removeRecipe);
module.exports = router;
