const express = require("express");
const router = express.Router();
const {
  list,
  addRecipe,
  updateRecipe,
  removeRecipe,
} = require("../controller/recipeController");
router.get("/", list);
router.post("/", addRecipe);
router.put("/", updateRecipe);
router.delete("/:id", removeRecipe);
module.exports = router;
