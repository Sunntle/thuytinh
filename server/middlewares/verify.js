const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const listPermission = ['R2', 'R3', 'R4'];
const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, decode) => {
            if (err) return res.status(401).json({
                success: false,
                message: "Lỗi access token"
            })
            req.user = decode;
            next()
        })
    } else {
        return res.status(401).json({
            success: false,
            message: "Lỗi xác thực người dùng !!!"
        })
    }
});
const isRole = (role) => {
    return (req, res, next) => {

        const isUser = listPermission.findIndex(r => r === req.user.role);
        const isRole = listPermission.findIndex(r => r === role);
        if (isUser < isRole) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
        }
        next();
    };
};
module.exports = { verifyAccessToken, isRole, listPermission }