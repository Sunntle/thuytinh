const express = require("express");
const router = express.Router();
const parser = require("../middlewares/upload");
const { addNew, removeImgByUrl, addNewById, removeImgById, getAllImagesInCloud } = require("../controller/imageController");
router.get("/", getAllImagesInCloud)
router.post("/", parser.array("Image"), addNew);
router.post("/product/", parser.array("Image"), addNewById);
router.delete("/url/:id", removeImgByUrl);
router.delete("/:id/", removeImgById);
module.exports = router;
