const express = require("express");
const router = express.Router();
const {
    GetAllOrder
} = require("../controller/orderController");
router.get("/", GetAllOrder);
module.exports = router;