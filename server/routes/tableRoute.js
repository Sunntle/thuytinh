const { getAll, create, update, del, getId, updateStatusAndToken, checkCurrentTable,
    switchTables, bookingTables, checkTableBooking, getBooking } = require('../controller/tableController');
const express = require("express");
const router = express.Router();
router.get("/", getAll);
router.get("/current-table", checkCurrentTable);
router.get("/check-booking", checkTableBooking);
// router.get("/:id", getId);
router.post("/", create);
router.put("/", update);
router.put("/token", updateStatusAndToken);
router.delete("/:id", del);
router.post("/switch-tables", switchTables);

router.get("/booking", getBooking);
router.post("/booking", bookingTables);
module.exports = router;