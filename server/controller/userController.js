const {
  generateAccessToken,
  generateRefreshToken,
  generateHash,
} = require("../middlewares/jwt");
const { User, Order } = require("../models");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/mail");
const validator = require("validator");
const { getAllUserOnline } = require("../utils/socketHanlers");

exports.register = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email)
    return res.status(400).json({
      success: false,
      message: "Thiếu thông tin người dùng",
    });
  const [user, created] = await User.findOrCreate({
    where: { [Op.or]: { email: email, name: name } },
    defaults: { ...req.body },
  });
  if (created) {
    res.status(200).json({ success: true, data: user });
  } else {
    res.status(200).json({ success: false, mes: "Thông tin đã tồn tại rồi nha" });
  }
});


exports.login = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email)
    return res.status(400).json({
      success: false,
      message: "Thiếu thông tin người dùng",
    });
  const user = await User.findOne({ where: { email } });

  if (user && (await user.comparePassword(password))) {
    const { createdAt, updatedAt, refreshToken, password, ...userAcc } = user.toJSON();
    const accessToken = generateAccessToken(userAcc.id, userAcc.role);
    const newrefreshToken = generateRefreshToken(userAcc.id, userAcc.role);
    await User.update(
      { refreshToken: newrefreshToken },
      {
        where: { id: userAcc.id },
      }
    );
    res.cookie("refreshToken", newrefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      accessToken,
      account: user,
    });
  } else {
    return res.status(401).json("Lỗi thông tin tài khoản");
  }
});
exports.getAllUser = asyncHandler(async (req, res) => {
  const { _offset, _limit, _sort, _order, q, _like, _noQuery, ...rest } = req.query;

  if (_noQuery == 1) {
    return res.status(200).json(await User.findAll({ where: { role: 'R2' }, attributes: ["id", "name", "phone"], raw: true }));
  }
  const query = {
    include:
    {
      model: Order,
    },
    distinct: true,
  };
  if (_limit) query.limit = +_limit;
  if (_offset) query.offset = +_offset;
  if (q)
    query.where = {
      [Op.or]: [
        { name: { [Op.substring]: q } },
        { email: { [Op.substring]: q } },
      ],
    };
  if (_sort) query.order = [[_sort, _order]];
  if (_like) {
    const [a, b, c] = _like.split("_")//_like=role_R1_not
    query.where = query.where || {};
    query.where[Op.or] = query.where[Op.or] || [];
    let symbol = Op.like
    if (c == "not") {
      symbol = Op.notLike
    }
    query.where[Op.or].push({
      [a]: {
        [symbol]: b,
      },
    });
  }

  const { count, rows } = await User.findAndCountAll(query);
  const adminOnline = getAllUserOnline()
  rows.forEach(itemA => {
    const matchingItemB = adminOnline.find((itemB) => itemB.id === itemA.dataValues.id);
    if (matchingItemB) {
      itemA.dataValues.status = true;
    }else{
      itemA.dataValues.status = false
    }
  })
  return res.status(200).json({
    success: true,
    total: count,
    data: rows,
  });
});
exports.getDetailUser = asyncHandler(async (req, res) => {
  const _id = req.params.id
  const user = await User.findOne({
    raw: true,
    where: { id: _id },
    include: Order
  });
  return res.status(200).json({
    success: true,
    data: user,
  });
});
exports.setPassUser = asyncHandler(async (req, res) => {
  const id = req.user?.id;
  const { pass_new, current } = req.body;
  if (!pass_new || !current)
    return res.status(404).json({
      success: false,
      data: "Chưa đủ thông tin",
    });
  const result = await User.findByPk(id);
  if (result && (await result.comparePassword(current))) {
    result.password = pass_new;
    await result.save();
    return res.status(200).json({
      success: true,
      message: 'Cập nhật thành công'
    })
  } else {
    return res.status(404).json({
      success: false,
      message: 'Sai thông tin'
    })
  }
})

exports.updateAccount = asyncHandler(async (req, res) => {
  const { id, ...rest } = req.body;
  const avatarPath = req?.file?.path;
  const dataToUpdate = avatarPath
    ? { avatar: avatarPath.replace("/upload/", "/upload/w_400,h_300/"), ...rest }
    : rest;
  await User.update(dataToUpdate, {
    where: { id },
    individualHooks: avatarPath ? true : false
  })
  res.status(200).json({ message: "Cập nhật thành công" });
});
exports.forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body?.email;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Không tìm thấy email");
  let code = generateHash(email);
  const html = `Link này sẽ hết hạn vào 1 giờ. Click vào đây sẽ thay đổi mật khẩu <a href="${process.env.URL_CLIENT}/user/update-password/${code}">Click here</a>`;
  await sendEmail(email, html);
  return res.status(200).json({
    success: true,
  });
});
exports.setForgotPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_EMAIL, async (err, decode) => {
    if (err)
      return res
        .status(404)
        .json({ success: false, data: "Hết mã xác nhận hết hạn" });
    let result = await User.findOne({ where: { email: decode.email } });
    result.password = password;
    await result.save();
    result
      ? res.status(200).json({ success: true })
      : res.status(404).json({ success: false });
  });
});
exports.refreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies?.refreshToken;
  if (!validator.isJWT(cookie)) throw new Error("Không tìm thấy refresh token");
  jwt.verify(cookie, process.env.JWT_SECRET_REFRESH, async (err, decode) => {
    if (err)
      return res.status(400).json({
        success: false,
        message: "Lỗi access token",
      });
    const re = await User.findOne({
      where: { id: decode?.id, refreshToken: cookie },
      raw: true,
    });
    if (re)
      return res
        .status(200)
        .json({ success: true, token: generateAccessToken(re.id, re.role) });
    res.status(404).json({ success: false });
  });
});
exports.currentAccount = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const ru = await User.findByPk(id);
  if (!ru) res.status(404).json({ success: false });
  const { createdAt, updatedAt, refreshToken, password, ...userAcc } = ru?.toJSON();
  return res.status(200).json(userAcc);
});
exports.logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookie");
  await User.update(
    { refreshToken: "" },
    { where: { refreshToken: cookie.refreshToken } },
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    message: "Logout is done !",
  });
});
exports.deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const re = await User.destroy({ where: { id: id } });
  return res.status(200).json({
    success: true,
    message: "Xóa thành công",
  });
});
