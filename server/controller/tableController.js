const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const {
  Tables,
  Order,
  TableByOrder,
  User,
} = require("../models");


const { apiQueryRest, bien } = require('../utils/const');
const { Op } = require('sequelize');
const { generateTable } = require("../middlewares/jwt");
const { listPermission } = require("../middlewares/verify");

const findTables = async (tables) => {
  const re = await Tables.findAll({
    include: {
      model: TableByOrder, include: {
        model: Order, ...bien,
        attributes: ["id", "name", "phone", "total", "status", "id_employee", "createdAt", "updatedAt"]
        , where: { status: { [Op.lt]: 3 } }
      }
    },
    where: { id: { [Op.in]: tables } },
    nest: true
  });
  return re
}

exports.getAll = asyncHandler(async (req, res) => {
  let query = {
    ...apiQueryRest(req.query), nest: true,
    include: {
      model: TableByOrder, include: {
        model: Order, ...bien,
        attributes: ["id", "name", "phone", "total", "status", "id_employee", "createdAt", "updatedAt"]
        , where: { status: { [Op.lt]: 3 } }
      }
    }
  };
  if (req.query._noQuery === 1) delete query.include;
  let tables = await Tables.findAll(query);
  res.status(200).json(tables);
});

exports.getId = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { token, id_employee } = req.query;
  if (token) {
    jwt.verify(token, process.env.JWT_INFO_TABLE, async (err, decode) => {
      if (err) return res.status(404).json("Bàn bạn đã hết hạn sử dụng");
      let data = await findTables(decode.tables);
      const isToken = data.every(item => item.token == token);
      if (isToken) return res.status(200).json(data);
      return res.status(404).json("Bàn bạn đã hết hạn sử dụng");

    })
  } else {
    const employee = await User.findOne({
      where: {
        id: id_employee,
        role: listPermission,
      }, raw: true
    });
    if (employee) {
      let data = await findTables([id]);
      res.status(200).json(data);
    } else {
      res.status(404).json("Phải phải nhân viên !");
    }
  }
});

exports.checkCurrentTable = asyncHandler(async (req, res, next) => {
  const { token, id_employee } = req.query;
  if (token) {
    jwt.verify(token, process.env.JWT_INFO_TABLE, async (err, decode) => {
      if (err) {
        return res.status(404).json("Bàn bạn đã hết hạn sử dụng");
      }
      if (decode) {
        const data = await Tables.findAll({
          where: { token: { [Op.substring]: token } },
        })
        if (data && data.length > 0) {
          res.status(200).json(decode);
        }
        else res.status(404).json({ message: "Không tìm thấy bàn!" });
      } else {
        return res.status(404).json({ message: "Không tìm thấy bàn!" });
      }
    });
  } else {
    res.status(404).json("......");
  }
});

exports.create = asyncHandler(async (req, res) => {
  const { name_table, qr_code } = req.body;
  const [_, created] = await Tables.findOrCreate({
    where: {
      [Op.or]: [
        { qr_code },
        { name_table }
      ]
    },
    defaults: req.body,
    raw: true,
    returning: true
  });
  if (!created) return res.status(404).json({ success: false, data: "Đã có tên bàn trên" });
  res.status(200).json({ success: true, data: "Tạo bàn thành công" });

});


exports.update = asyncHandler(async (req, res) => {
  const { id, qr_code, name_table } = req.body;
  const is = await Tables.findOne({
    where: {
      [Op.and]: [
        { [Op.or]: [{ qr_code: { [Op.eq]: qr_code } }, { name_table: { [Op.eq]: name_table } }] },
        { id: { [Op.ne]: id } }
      ]
    },
    raw: true
  });
  if (is) return res.status(404).json({ success: false, data: "Đã có tên bàn trên" });
  await Tables.update(req.body, { where: { id: id } })
  res.status(200).json({ success: true, data: "Tạo bàn thành công" });

});

exports.updateStatusAndToken = asyncHandler(async (req, res) => {
  const { tables } = req.body;
  let token = generateTable(JSON.stringify(req.body));
  await Tables.update({
    status_table: 1,
    token: token
  },
    { where: { id: { [Op.in]: tables } } }
  );
  res.status(200).json(token);
});

exports.del = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Tables.destroy({
    where: { id }
  });
  res.status(200).json("Xóa thành công");
});
