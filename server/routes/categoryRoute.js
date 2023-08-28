const express = require("express");
const { list, addCate, updateCate, removeCate } = require("../controller/categoryController");
const parser = require("../middlewares/upload");
const router = express.Router();

router.get("/", list);
router.post("/", parser.single('thumbnail'), addCate);
router.put("/", parser.single('thumbnail'), updateCate);
router.delete("/:id", removeCate);
module.exports = router;
