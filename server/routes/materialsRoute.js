const express = require("express");
const router = express.Router();
const { list, getDetail, addMaterial, updateMaterial, removeMaterial, importWarehouse } = require("../controller/materialsController");
const parser = require("../middlewares/upload");

router.get("/", list);
router.get("/:id", getDetail);
router.post("/", parser.single("Image"), addMaterial);
router.post("/import", importWarehouse);
router.put("/", parser.single("Image"), updateMaterial);
router.delete("/:id", removeMaterial);
module.exports = router;
