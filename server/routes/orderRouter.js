const express = require("express");
const router = express.Router();
const {
    GetAllOrder, delOrder, updateOrder
} = require("../controller/orderController");


router.get("/", GetAllOrder);
router.put("/", updateOrder);
router.delete("/:id", delOrder);

module.exports = router;