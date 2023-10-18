const express = require("express");
const router = express.Router();
const { register, login, getAllUser, logout, setForgotPassword,
    setPassUser, refreshToken, forgotPassword, currentAccount, updateAccount,
    deleteUser, 
    getDetailUser} = require("../controller/userController");
const { isRole, verifyAccessToken } = require("../middlewares/verify");
const parser = require("../middlewares/upload");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/set-password", verifyAccessToken, setPassUser);
router.get("/refresh-token", refreshToken);
router.get("/current", verifyAccessToken, currentAccount);
router.put("/", [verifyAccessToken, parser.single("avatar")], updateAccount);
router.get("/detail/:id" , getDetailUser);
router.get("/forgot", forgotPassword);
router.post("/set-forgot", setForgotPassword);
router.get("/get-all" ,verifyAccessToken, getAllUser);
router.delete("/:id", [verifyAccessToken, [isRole('R4')]], deleteUser);

module.exports = router;

