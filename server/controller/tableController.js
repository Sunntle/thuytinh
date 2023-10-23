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

  tables && tables.forEach(table => {
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
  const { name_table, qr_code } = req.body;
  const [table, created] = await Tables.findOrCreate({
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
  let token = generateTable(req.body);
  await Tables.update({
    status_table: 1,
    token: token
  },
    { where: { id: { [Op.in]: tables } } },
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
//, order: [["createdAt", "asc"]]
