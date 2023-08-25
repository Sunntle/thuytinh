const express = require("express");
const router = express.Router();
const parser = require("../middlewares/upload");
const {
  list,
  getDetail,
  getByCategory,
  addItem,
  updateProduct,
  removeProduct,
} = require("../controller/productController");
router.get("/", list);
router.get("/:id", getDetail);
router.get("/category/:id", getByCategory);
router.post("/", addItem);
router.put("/:id", updateProduct);
router.delete("/:id", removeProduct);
module.exports = router;
