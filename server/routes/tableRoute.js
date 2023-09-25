const { getAll, create, update, del, getId } = require('../controller/tableController');
const express = require("express");
const router = express.Router();
router.get("/", getAll);
router.get("/:id", getId);
router.post("/", create);
router.put("/", update);
router.delete("/:id", del);
module.exports = router;