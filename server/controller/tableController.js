const asyncHandler = require("express-async-handler");
const {
  Tables,
  Order,
  OrderDetail,
  ImageProduct,
  Product,
  TableByOrder,
} = require("../models");

const { where } = require("sequelize");

const { apiQueryRest } = require('../utils/const');
const { Op } = require('sequelize');

exports.getAll = asyncHandler(async (req, res) => {
  let query = { ...apiQueryRest(req.query) };
  let tables = await Tables.findAll(query);

  const tableByOrder = await Order.findAll({
    include: [{ model: TableByOrder, as: "TableByOrder" },
    { model: OrderDetail, as: "orderToDetail", include: { model: Product, as: "product", include: { model: ImageProduct, attributes: ["url"] } } }],
    where: { status: { [Op.lt]: 3 } }, raw: true, nest: true
  });

  tables.forEach(table => {
    const match = tableByOrder.find(order => order.TableByOrder && order.TableByOrder.tableId === table.id);
    if (match) {
      const { TableByOrder, ...data } = match
      table.order = data
    }
  });
  res.status(200).json(tables);
});

exports.getId = asyncHandler(async (req, res) => {
  let re = null;
  const { id_order } = req.query;
  const { id } = req.params;

  if (id_order) {
    re = await TableByOrder.findAll({
      where: { orderId: id_order },
      include: [{ model: Tables }, { model: Order, include: { model: OrderDetail, as: "orderToDetail", include: { model: Product, as: "product", include: { model: ImageProduct } } } }],
      raw: true, nest: true
    });
  } else {
    re = await Tables.findByPk(id);
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

exports.updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTable = await Tables.update(
      {
        id_order: null,
        status_table: 0,
      },
      { where: { id: id } },
    );

    if (updatedTable)
      return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

exports.del = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Tables.destroy({
    where: { id },
  });
  res.status(200).json("Xóa thành công");
});
//, order: [["createdAt", "asc"]]
