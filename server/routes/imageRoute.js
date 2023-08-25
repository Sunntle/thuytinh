const express = require("express");
const router = express.Router();
const parser = require("../middlewares/upload");
const { addNew, removeImgByUrl } = require("../controller/imageController");
router.post("/", parser.array("Image"), addNew);
router.delete("/", removeImgByUrl);
module.exports = router;
