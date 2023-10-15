const express = require("express");
const router = express.Router();
const { list, add, maskAsRead, destroy } = require("../controller/notificationController");
router.get("/", list);
router.post("/", add);
router.put("/", maskAsRead);
router.delete("/:id", destroy);
module.exports = router;