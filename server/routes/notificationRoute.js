const express = require("express");
const router = express.Router();
const { list, add, edit, destroy } = require("../controller/notificationController");
router.get("/", list);
router.post("/", add);
router.put("/", edit);
router.delete("/:id", destroy);
module.exports = router;