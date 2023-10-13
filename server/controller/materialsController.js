const { Materials, Notification } = require("../models");
const { Op } = require("sequelize");
//const unitMasterial = ["kg", "gram", "phần", "lít", "quả", "con", "thùng"];


exports.list = async (req, res) => {
  const { _offset, _limit, _sort, _order, q, _over, ...rest } = req.query;
  const query = {
    raw: true,
  };
  let over = _over || 30;

  if (_limit) query.limit = +_limit;
  if (_offset) query.offset = +_offset;
  if (q) query.where = { name_material: { [Op.substring]: q } };
  if (_sort) query.order = [[_sort, _order]];

  const { count, rows } = await Materials.findAndCountAll(query);

  let chart = await Materials.findAll({
    attributes: ["id", "price", "amount", "name_material", "unit", "image"],
    raw: true,
  });

  let dataChart = [];

  chart.forEach((ele) => {
    if (ele.unit === "gram") {
      ele.amount = ele.amount / 1000;
      ele.unit = "kg";
    }
    if (ele.amount <= over) {
      dataChart.push(ele);
    }
  });

  // if (dataChart.length > 0 && !notificationSent) {
  //   let created = await Notification.create(
  //     {
  //       type: "Nguyên liệu",
  //       description: `Có ${dataChart.length} chuẩn bị hết hàng`,
  //     },
  //     { raw: true }
  //   );
  //   _io.emit("new message", created);
  //   notificationSent = true;
  // }

  res.status(200).json({ total: count, data: rows, dataChart });
};
exports.getDetail = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Materials.findOne({
      where: { id: _id },
      raw: true,
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addMaterial = async (req, res) => {
  try {
    const img = req.file;
    const response = await Materials.create({
      ...req.body,
      image: img.path.replace("/upload/", "/upload/w_400,h_300/"),
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateMaterial = async (req, res) => {
  try {
    const image = req.file?.path.replace("/upload/", "/upload/w_400,h_300/");
    await Materials.update(
      { ...req.body, image },
      {
        where: { id: +req.body.id },
      }
    );
    res.status(200).json("Cập nhật công thức thành công !");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removeMaterial = async (req, res) => {
  try {
    const _id = req.params.id;
    const response = await Materials.destroy({
      where: { id: _id },
      individualHooks: true,
    });
    res.status(200).json("Xóa công thức thành công");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
