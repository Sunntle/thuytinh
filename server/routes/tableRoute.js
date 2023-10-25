const { getAll, create, update, del, getId, updateStatusAndToken, checkCurrentTable } = require('../controller/tableController');
const express = require("express");
const router = express.Router();
router.get("/", getAll);
router.get("/:id", getId);
router.get("/current-table", checkCurrentTable);
router.post("/", create);
router.put("/", update);
router.put("/token", updateStatusAndToken);
router.delete("/:id", del);
module.exports = router;