const express = require("express");
const router = express.Router();
const {
    GetAllOrder, delOrder, updateOrder, createOrder
} = require("../controller/orderController");


router.post("/", createOrder);
router.get("/", GetAllOrder);
router.put("/", updateOrder);
router.delete("/:id", delOrder);

module.exports = router;