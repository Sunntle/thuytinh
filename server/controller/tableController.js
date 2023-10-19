
const asyncHandler = require('express-async-handler');
const {
  Tables,
  Order,
  OrderDetail,
  ImageProduct,
  Product,
  TableByOrder,
} = require("../models");
const { apiQueryRest } = require('../utils/const');

exports.getAll = asyncHandler(async (req, res) => {

  let query = { ...apiQueryRest({...req.query, title: "name_table"}) }
  const re = await Tables.findAll(query);
  res.status(200).json(re);
});

exports.getId = asyncHandler(async (req, res) => {

  const { id_order } = req.query;
  const { id } = req.params;
  let re = {}
  if (id_order) {
    re.order = await Order.findByPk(id_order, {
      include: {
        model: OrderDetail,
        as: "orderToDetail",
        include: [
          {
            model: Product,
            as: "product",
            include: [
              {
                model: ImageProduct,
                attributes: ["url"],
              }
            ]
          }
        ]
      }
    })
    re.table = await TableByOrder.findAll({
      where: { orderId: id_order },
      include: { model: Tables },
      raw: true, nest: true
    });
  } else {
    re.table = await Tables.findByPk(id);
  }
  res.status(200).json(re);
});

exports.create = asyncHandler(async (req, res) => {
  const { name_table } = req.body;
  const [table, created] = await Tables.findOrCreate({
    where: { name_table: name_table },
    defaults: req.body,
  });
  if (created) return res.status(200).json("Tạo bàn thành công");
  res.status(404).json("Đã có tên bàn trên");
});

exports.update = asyncHandler(async (req, res) => {
  const { id, ...rest } = req.body;
  const isName = await Tables.findOne({
    where: { name_table: req.body.name_table },
  });
  if (isName) return res.status(200).json("Trùng tên bàn khác");
  await User.update(rest, {
    where: { id: id },
  });
  res.status(200).json("Cập thành công");
});

exports.del = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Tables.destroy({
    where: { id },
  });
  res.status(200).json("Xóa thành công");
});
//, order: [["createdAt", "asc"]]
