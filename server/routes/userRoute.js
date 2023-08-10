const express = require("express");
const router = express.Router();
const { register, login, getAllUser, setPassUser, refreshToken, currentAccount } = require("../controller/userController");
const { isRole, verifyAccessToken } = require("../middlewares/verify");

router.post("/register", register);
router.post("/login", login);
router.post("/set-password", verifyAccessToken, setPassUser);
router.get("/refresh-token", refreshToken);
router.get("/current", verifyAccessToken, currentAccount);

router.get("/get_all", verifyAccessToken, getAllUser);
module.exports = router;

