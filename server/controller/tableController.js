const asyncHandler = require("express-async-handler");
const {
  Tables,
  Order,
  OrderDetail,
  ImageProduct,
  Product,
  TableByOrder,
} = require("../models");


const { apiQueryRest } = require('../utils/const');
const { Op } = require('sequelize');
const { generateTable } = require("../middlewares/jwt");

exports.getAll = asyncHandler(async (req, res) => {
  let query = { ...apiQueryRest(req.query), raw: true };
  let tables = await Tables.findAll(query);

  const tableByOrder = await Order.findAll({
    include: [{ model: TableByOrder },
    {
      model: OrderDetail, include: [
        {
          model: Product,
          include: [
            {
              model: ImageProduct,
              attributes: ["url"],
            },
          ],
        },
      ],
    }
    ],
    where: { status: { [Op.lt]: 3 } },
  });

  tables.forEach(table => {
    tableByOrder.forEach(element => {
      const { TableByOrders: tables, ...data } = element.toJSON();
      if (tables.findIndex(item => +item.tableId === +table.id) > -1) {
        table.order = data;
      }
    });
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
      include: [{ model: Tables }, { model: Order, include: { model: OrderDetail, include: { model: Product, include: { model: ImageProduct } } } }],
      nest: true
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

exports.updateStatusAndToken = asyncHandler(async (req, res) => {
  const { tables } = req.body;
  let token = generateTable(req.body);
  await Tables.update({
    status_table: 1,
    token: token
  },
    { where: { id: { [Op.in]: tables } } },
  );
  res.status(200).json("Cập nhật thành công");
});

exports.del = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Tables.destroy({
    where: { id },
  });
  res.status(200).json("Xóa thành công");
});
//, order: [["createdAt", "asc"]]
