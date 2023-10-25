const express = require("express");
const router = express.Router();
const {
    GetAllOrder, delOrder, updateOrder, createOrder, dashBoard, totalRevenue, updateOrderAdmin,getOrderById
} = require("../controller/orderController");


router.post("/", createOrder);
router.get("/", GetAllOrder);
router.get("/:id", getOrderById)
router.put("/", updateOrder);
router.put("/admin", updateOrderAdmin);
router.delete("/:id", delOrder);
router.get("/thongke", dashBoard);
module.exports = router;