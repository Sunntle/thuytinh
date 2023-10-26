const express = require("express");
const router = express.Router();
const {
    GetAllOrder, delOrder, updateOrder, createOrder, dashBoard, updateOrderAdmin, getOrderById
} = require("../controller/orderController");

router.get("/thongke", dashBoard);
router.post("/", createOrder);
router.get("/", GetAllOrder);
router.get("/:id", getOrderById)
router.put("/", updateOrder);
router.put("/admin", updateOrderAdmin);
router.delete("/:id", delOrder);

module.exports = router;