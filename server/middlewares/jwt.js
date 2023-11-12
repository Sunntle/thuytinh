const jwt = require('jsonwebtoken');

const generateAccessToken = (id, role) => {
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET_ACCESS, { expiresIn: process.env.JWT_ACCESS_EXPIRE_IN })
}
const generateRefreshToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET_REFRESH, { expiresIn: process.env.JWT_REFRESH_EXPIRE_IN })
}
const generateTable = (body) => {
    return jwt.sign(body, process.env.JWT_INFO_TABLE)
}

function generateHash(body) {
    return jwt.sign({ ...body }, process.env.JWT_SECRET_EMAIL, { expiresIn: "1h" })
}


module.exports = { generateAccessToken, generateRefreshToken, generateHash, generateTable };