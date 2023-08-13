const jwt = require('jsonwebtoken');

const generateAccessToken = (id, role) => {
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET_ACCESS, { expiresIn: process.env.JWT_ACCESS_EXPIRE_IN })
}
const generateRefreshToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET_REFRESH, { expiresIn: process.env.JWT_REFRESH_EXPIRE_IN })
}

function generateHash(email) {
    return jwt.sign({ email }, process.env.JWT_SECRET_EMAIL, { expiresIn: process.env.JWT_ACCESS_EXPIRE_IN })
}


module.exports = { generateAccessToken, generateRefreshToken, generateHash };