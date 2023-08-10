const express = require("express");
const router = express.Router();
const { list, getDetail, getByCategory, addItem } = require("../controller/productController");
router.get("/", list);
router.get("/:id", getDetail);
router.get("/category/:id", getByCategory);
router.post("/", addItem);
module.exports = router;
