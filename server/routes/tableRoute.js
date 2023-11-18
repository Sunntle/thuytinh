const { getAll, create, update, del, getId, updateStatusAndToken, checkCurrentTable,
    switchTables, bookingTables, checkTableBooking, deleteBooking,
    getBooking, activeBooking, updateBooking, getListBooking, pendingTable, cancelBooking } = require('../controller/tableController');
const express = require("express");
const router = express.Router();
router.get("/", getAll);
router.get("/get-booking", getListBooking);
router.get("/current-table", checkCurrentTable);
router.get("/check-booking", checkTableBooking);
router.get("/booking", getBooking);

router.post("/", create);
router.put("/cancel-booking", cancelBooking);
router.put("/", update);
router.put("/token", updateStatusAndToken);
router.get("/:id", getId);
router.put("/booking", updateBooking);

router.delete("/booking/:id", deleteBooking);
router.delete("/:id", del);
router.post("/switch-tables", switchTables);


router.post("/pending-booking", pendingTable);
router.post("/booking", bookingTables);
router.post("/active-booking", activeBooking);
module.exports = router;