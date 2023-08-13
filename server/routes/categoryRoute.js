const express = require("express");
const { list, addCate, updateCate, removeCate } = require("../controller/categoryController");

const router = express.Router();

router.get("/", list);
router.post("/", addCate);
router.put("/:id", updateCate);
router.delete("/:id", removeCate);
module.exports = router;
