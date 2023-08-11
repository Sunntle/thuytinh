const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt");
// const { User, Order } = require("../models");

const asyncHandler = require('express-async-handler');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const db = require("../models");


exports.register = asyncHandler(async (req, res) => {
  const { name, password, email, phone } = req.body;
  if (!name || !password || !email || !phone) return res.status(400).json({
    success: false,
    message: 'Thiếu thông tin người dùng'
  });
  const [user, created] = await db.User.findOrCreate({
    where: { email: email }, defaults: { name: name, email: email, password: password, phone: phone }
  });
  if (created) {
    res.status(200).json({ success: true, data: user });
  } else {
    res.status(200).json({ success: false, mes: 'Email đã tồn tại' });
  }
});
exports.login = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) return res.status(400).json({
    success: false,
    message: 'Thiếu thông tin người dùng'
  });
  const user = await User.findOne({ where: { email } });
  if (user && (await user.comparePassword(password))) {
    const { createdAt, updatedAt, refreshToken, password, ...userAcc } = user.toJSON();
    const accessToken = generateAccessToken(userAcc.id, userAcc.role);
    const newrefreshToken = generateRefreshToken(userAcc.id, userAcc.role);
    await User.update({ refreshToken: newrefreshToken }, {
      where: { id: userAcc.id }
    })
    res.cookie('refreshToken', newrefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    return res.status(200).json({
      success: true,
      data: {
        accessToken,
        userAcc
      }
    })
  } else {
    return res.status(401).json({ success: false, message: 'Lỗi thông tin tài khoản' });
  }
});
exports.getAllUser = asyncHandler(async (req, res) => {
  const result = await User.findAll({ include: Order });
  return res.status(200).json({
    success: true,
    data: result
  })
});
exports.setPassUser = asyncHandler(async (req, res) => {
  const id = req.user?.id;
  const { pass_new, current } = req.body;
  if (!pass_new || !current) return res.status(404).json({
    success: false,
    data: 'Chưa đủ thông tin'
  });
  const result = await User.findByPk(id);
  if (result && (await result.comparePassword(current))) {
    result.password = pass_new;
    await result.save();
    return res.status(200).json({
      success: true
    })
  } else {
    return res.status(404).json({
      success: false,
      data: 'Sai thông tin'
    })
  }
});
exports.forgotPassword = asyncHandler(async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(404).json({
      success: false
    })
  }
  return res.status(404).json({
    success: false
  })
});
exports.refreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies?.refreshToken;
  if (!validator.isJWT(cookie)) throw new Error('Không tìm thấy refresh token');
  const ru = await jwt.verify(cookie, process.env.JWT_SECRET_REFRESH);
  const re = await User.findOne({ where: { id: ru?.id, refreshToken: cookie } });
  console.log(re.toJSON())
  if (re) return res.status(200).json({
    success: true,
    data: generateAccessToken(re.id, re.role)
  })
  res.status(404).json({ success: false })
});
exports.currentAccount = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const ru = await User.findByPk(id);
  const { createdAt, updatedAt, refreshToken, password, ...userAcc } = ru.toJSON();
  if (ru) return res.status(200).json({
    success: true,
    data: userAcc
  })
  res.status(404).json({ success: false })
});