const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const {
  Tables,
  Order,
  TableByOrder,
  User,
  Notification,
  OrderDetail,
  Product,
  ImageProduct,
} = require("../models");
const validator = require("validator");

const { apiQueryRest, bien, bookingValidate, templateSendUser, checkBooking, isEmpty, handleTimeDining, timeLimit } = require('../utils/const');
const { Op } = require('sequelize');
const { generateTable, generateHash } = require("../middlewares/jwt");
const { listPermission } = require("../middlewares/verify");
const moment = require("moment");
const sendEmail = require("../utils/mail");

const findTables = async (tables) => {
  const re = await Tables.findAll({
    include: {
      model: TableByOrder,
      include: {
        model: Order,
        attributes: ["id", "name", "phone", "total", "status", "id_employee", "createdAt", "updatedAt"],
        where: {
          status: {
            [Op.and]: [
              { [Op.lt]: 4 },
              { [Op.ne]: 0 }
            ]
          }
        },
        include: {
          model: OrderDetail,
          include: {
            model: Product,
            include: {
              model: ImageProduct,
            }
          }
        }
      }
    },
    where: { id: { [Op.in]: tables } },
    nest: true
  });
  return re;
};


exports.getAll = asyncHandler(async (req, res) => {
  let query = {
    ...apiQueryRest(req.query), nest: true,
    include: {
      model: TableByOrder, include: {
        model: Order, ...bien,
        attributes: ["id", "name", "phone", "total", "status", "id_employee", "createdAt", "updatedAt"],
        where: {
          status: {
            [Op.and]: [
              { [Op.lte]: 3 },
              { [Op.ne]: 0 }
            ]
          }
        }
      }
    }
  };

  if (req.query._noQuery === 1) delete query.include;
  const rowTable = await Tables.findAll(query);
  const tables = [];
  for (const item of rowTable) {
    const { id } = item.toJSON();
    const isEeservation = await checkBooking(({ time: new Date(), tableId: id, dining_option: "reservation", params: "add" }));
    if (!isEeservation) {
      tables.push(item)
    }
  }
  res.status(200).json(tables);
});

exports.getId = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { token, id_employee } = req.query;
  const result = await Tables.findOne({ where: { id } });
  if (!result) {
    return res.status(404).json({ success: false, message: "Invalid" })
  }
  const check = await checkBooking({ time: new Date(), tableId: id, dining_option: "reservation", params: "add", isActive: true });
  if (check && !token) return res.status(404).json({
    success: false, data: "Bàn đã được đặt trước",
    prevTime: moment(check).subtract(30, "minutes"), nextTime: moment(check).add(30, "minutes")
  });
  if (id_employee) {
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
  } else {
    if (token) {
      await jwt.verify(token, process.env.JWT_INFO_TABLE, async (err, decode) => {
        if (err) return res.status(404).json("Bàn bạn đã hết hạn sử dụng");
        const data = await findTables([id]);
        if (data) return res.status(200).json({ success: true, data });
        else return res.status(404).json("Bàn bạn đã hết hạn sử dụng");
      })
    } else {
      res.status(200).json({ success: true, data: [result] });
    }
  }
});


exports.checkCurrentTable = asyncHandler(async (req, res, next) => {
  const { token, id_employee } = req.query;

  if (token) {
    jwt.verify(token, process.env.JWT_INFO_TABLE, async (err, decode) => {
      if (err) {
        return res.status(200).json({ message: "Bàn bạn đã hết hạn sử dụng" });
      }
      if (decode) {

        const data = await Tables.findAll({
          where: { token: { [Op.substring]: token } },
        })
        if (data && data.length > 0) {
          res.status(200).json({ ...decode, tables: data.map(i => i.id) });
        }
        else res.status(200).json({ message: "Không tìm thấy bàn!" });
      } else {
        return res.status(200).json({ message: "Không tìm thấy bàn!" });
      }
    });
  } else {
    res.status(200).json({ success: false, message: "Invalid token" });
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
  await Tables.prototype.updateStatusTable(req.body, [id]);
  res.status(200).json({ success: true, data: "Tạo bàn thành công" });
});


exports.updateStatusAndToken = asyncHandler(async (req, res) => {
  const { tables, reset } = req.body;
  if (tables && reset) {
    await Tables.prototype.updateStatusTable({
      status_table: 0,
      token: null
    }, tables)
    return res.status(200).json("Đặt lại bàn thành công! ");
  }
  let check = await checkBooking({ time: new Date(), tableId: tables, dining_option: "reservation", params: "add" });
  if (check) return res.status(404).json({ success: false, data: "Bàn đã được đặt trước" });
  let token = generateTable(JSON.stringify(req.body));
  await Tables.prototype.updateStatusTable({
    status_table: 1,
    token: token
  }, tables)
  res.status(200).json(token);
});

exports.del = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Tables.destroy({
    where: { id }
  });
  res.status(200).json("Xóa thành công");
});
exports.switchTables = asyncHandler(async (req, res) => {
  const { newTable, currentTable, idOrder } = req.body;
  if (!newTable || !currentTable || !idOrder) return res.status(404).json({ success: false, data: "Invalied" })
  let check = await checkBooking({ time: new Date(), tableId: newTable, dining_option: "reservation", params: "add" });
  if (check) return res.status(404).json({ success: false, data: "Bàn đã được đặt trước" });
  if (await Tables.prototype.checkStatus([newTable], 0)) return res.status(404).json({ success: false, data: "Bàn đang được sử dụng" });
  await TableByOrder.update({ tableId: newTable }, { where: { tableId: currentTable, orderId: idOrder } });
  let getCurrent = await Tables.findOne({ where: { id: currentTable }, raw: true });
  await Tables.prototype.updateStatusTable({ token: getCurrent.token, status_table: 1 }, [newTable]);
  await Tables.prototype.updateStatusTable({ token: null, status_table: 0 }, [currentTable]);
  res.status(200).json({ success: true, data: "Chuyển thành bàn thành công" });
});

const handCheckBooking = async (time, tableId) => {
  const checkTimeTable = await TableByOrder.findOne({
    where: {
      [Op.and]: [
        { dining_option: "reservation" },
        {
          status: {
            [Op.or]: [{ [Op.eq]: "pending" }, { [Op.eq]: "confirmed" }]
          }
        },
        {
          createdAt: {
            [Op.gte]: moment(time).subtract(timeLimit, 'minutes'),
            [Op.lte]: moment(time).add(timeLimit, 'minutes')
          }
        },
        { tableId: tableId }
      ]
    },
    raw: true
  });
  const bookEatIn = await checkBooking({ time, tableId });
  const result = checkTimeTable ? true : false && bookEatIn;
  return result
}

const findTablesByBooking = async (time, where) => {
  let arrBooking = [];
  const checkTimeTable = await Tables.findAll({
    where: {
      ...where
    },
    raw: true
  });
  for (const item of checkTimeTable) {
    const tableIdEating = moment(item.updatedAt).isAfter(moment(time).subtract(timeLimit, 'minutes'));
    if (item.status_table === 1 && tableIdEating) continue;
    const check = await handCheckBooking(time, item.id);
    if (!check) {
      arrBooking.push(item)
    }
  }
  return arrBooking;
}
exports.checkTableBooking = asyncHandler(async (req, res) => {
  const { createdAt: time, position, party_size } = req.query;
  const createdAt = moment(time, "DD-MM-YYYY HH:mm:ss");
  const arrBooking = await findTablesByBooking(moment(createdAt), { position: position });
  if (arrBooking.length > 0) {
    res.status(200).json({ success: true, time: createdAt, message: `Có bàn vào lúc ${moment(createdAt).format('HH:mm, DD/MM/YYYY')}, cho ${party_size} người lớn.`, data: arrBooking });
  } else {
    res.status(404).json({ success: false, message: "Bàn đã được đặt trước" });
  }
})

const checkPending = []
const handTimeTable = ({ id }) => {
  setTimeout(async () => {
    const check = await TableByOrder.findByPk(id, { raw: true });
    if (check.status === "pending") {
      await TableByOrder.destroy({ where: { id: id } });
    }
    const index = checkPending.findIndex(el => el.id == id)
    checkPending.splice(index, 1)
  }, 1 * 15000);
};

exports.pendingTable = asyncHandler(async (req, res) => {
  const { createdAt, tableId, party_size } = req.body;
  if (isEmpty(createdAt) || isEmpty(tableId) || isEmpty(party_size)) {
    return res.status(404).json({ success: false, message: "Thiếu dữ liệu" });
  }
  const isBooking = await handCheckBooking(createdAt, tableId);
  if (isBooking) return res.status(404).json({ success: false, message: "Bàn đã được đặt trước" });
  const data = await TableByOrder.create({ ...req.body, status: "pending", dining_option: "reservation" });
  checkPending.push({ id: data.dataValues.id })
  handTimeTable({ id: data.dataValues.id });
  res.status(200).json({ success: true, data });
})

exports.bookingTables = asyncHandler(async (req, res) => {
  const { id, phone, email, name, note } = req.body;
  const checkInput = bookingValidate(req.body);
  block = { id: null, check: false };
  if (checkInput == false) return res.status(404).json({ success: false, message: "Err Data" });
  const { createdAt, tableId } = await TableByOrder.findByPk(id, { raw: true });
  const dataOrder = await Order.create({ name, email, phone, status: 0 });
  let data = { createdAt, name, email, tableId, orderId: dataOrder.id };
  data = { ...data, token: await generateHash(data) };
  await TableByOrder.update({
    orderId: dataOrder.id,
    status: "confirmed",
    note: note
  }, { where: { id: id } });
  const result = await Order.findOne({ where: { id: dataOrder.id }, include: TableByOrder });
  await Notification.create(
    { type: "table", description: `Bàn số ${tableId} được đặt lúc ${moment(createdAt).format("HH:mm DD/MM")}`, content: tableId },
    { raw: true },
  );
  await sendEmail(email, "Thông báo", templateSendUser(data));
  // checkPending.length > 0 && checkPending.forEach(el => {
  //   if(el.id == id) el.check = false
  // })
  res.status(200).json({ success: true, data: result });
});

exports.getBooking = asyncHandler(async (req, res) => {
  const { phone, email, name, tableId } = req.query;
  if (isEmpty(phone) || isEmpty(email) || isEmpty(tableId)) {
    return res.status(404).json({ success: false, message: "Thiếu dữ liệu" });
  }
  const data = await TableByOrder.findAll({
    include: {
      model: Order, where: {
        [Op.or]: [{ name: name }, { phone: phone }, { email: email }],
        status: 0
      }
    },
    where: {
      dining_option: "reservation",
      status: "confirmed",
      createdAt: {
        [Op.lte]: moment(new Date()).add(30, 'minutes'),
        [Op.gte]: moment(new Date()).subtract(30, 'minutes')
      },
      tableId: tableId,
    },
    nest: true
  })
  res.status(200).json(data);
});

exports.activeBooking = asyncHandler(async (req, res) => {
  const { orderId, tableId } = req.body;
  const findtable = await Tables.findByPk(tableId, { raw: true });
  if (+findtable.status_table === 0) {
    const dataOrder = await Order.findByPk(orderId);
    const data = { tables: [tableId], name: dataOrder.name, timestamp: new Date().valueOf() };
    dataOrder.status = 1;
    await dataOrder.save()
    const token = generateTable(JSON.stringify(data));
    await Tables.prototype.updateStatusTable({ token: token, status_table: 1 }, [tableId]);
    const order = await Order.findOne({ where: { id: orderId }, ...bien });
    // block = { id: null, check: false };
    // clearTimeout(timeoutId);
    return res.status(200).json({ success: true, message: "Kích hoạt thành công", token, data, order });
  }
  res.status(404).json({ success: false, message: "Bàn đã trước đó được hoạt động" });
});

exports.updateBooking = asyncHandler(async (req, res) => {
  const { id, orderId, status_table, status_order, ...rest } = req.body;
  if (isEmpty(id)) return res.status(404).json("Err data");
  await TableByOrder.update({ ...rest }, { where: { id } });
  if (orderId) await Order.update({ status: status_order }, { where: { id: orderId } });
  return res.status(200).json("Cập nhật thành công");
});

exports.cancelBooking = asyncHandler(async (req, res) => {
  const token = req.body.token;
  if (!token || !validator.isJWT(token)) {
    res.status(200).json({ success: false, message: "Không đúng dịnh dạng" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_EMAIL, async (err, decode) => {
      if (err) return res.status(200).json({
        success: false,
        message: "Không đúng mã code"
      })
      const { tableId, orderId, createdAt } = decode;
      await TableByOrder.update({ status: "canceled" }, { where: { tableId, orderId } });
      res.status(200).json({
        success: true,
        message: `Đã hủy đặt bàn số ${tableId} lúc ${moment(createdAt).format("HH:mm DD/MM")}`
      })
    })
  }
})

//trong vong 5 phút thì chạy vào xóa luôn recode
exports.deleteBooking = asyncHandler(async (req, res) => {
  await TableByOrder.destroy({ where: { id: req.params.id } });
  return res.status(200).json("Đã xóa đặt bàn")
})

exports.getListBooking = asyncHandler(async (req, res) => {
  const data = await TableByOrder.findAndCountAll({
    include: { model: Order },
    where: { status: "confirmed" },
    order: [["createdAt", "ASC"]]
  });
  return res.status(200).json(data);
});