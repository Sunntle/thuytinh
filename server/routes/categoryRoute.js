const express = require("express");
const { list } = require("../controller/userController");

const router = express.Router();

router.get("/", list);
module.exports = router;
