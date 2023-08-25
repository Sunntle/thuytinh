const { getAll, create, update, del } = require('../controller/tableController');
const express = require("express");
const router = express.Router();
router.get("/", getAll);
router.post("/", create);
router.put("/", update);
router.delete("/:id", del);
module.exports = router;