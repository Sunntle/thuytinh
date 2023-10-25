const express = require("express");
const router = express.Router();
const {
    GetAllOrder, delOrder, updateOrder, createOrder, dashBoard, totalRevenue, updateOrderAdmin
} = require("../controller/orderController");


router.post("/", createOrder);
router.get("/", GetAllOrder);
router.put("/", updateOrder);
router.put("/admin", updateOrderAdmin);
router.delete("/:id", delOrder);
router.get("/thongke", dashBoard);
module.exports = router;