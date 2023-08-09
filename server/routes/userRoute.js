const express = require("express");
const { register } = require("../controller/userController");

const router = express.Router();

router.get("/", register);
module.exports = router;
