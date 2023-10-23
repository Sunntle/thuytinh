const { Op } = require("sequelize");
const { Reviews, Order } = require("../models");
const moment = require("moment");

exports.list = async (req, res) => {
  try {
    const { _offset, _limit, _sort, _order, q, _time, _group, ...rest } =
      req.query;
    const query = {
      include: [{ model: Order, attributes: ["createdAt"] }],
      order: [["createdAt", "DESC"]],
    };
    if (_limit) query.limit = +_limit;
    if (_offset) query.offset = +_offset;
    if (q)
      query.where = {
        [Op.or]: [
          { name: { [Op.substring]: q } },
          { description: { [Op.substring]: q } },
        ],
      };
    if (_sort) query.order = [[_sort, _order]];
    if (_group) {
      query.group = [_group];
    }
    if (_time) {
      const currentDateString = `${moment().year()}-${_time}-01`;
      const currentDate = moment(currentDateString, "YYYY-MM-DD HH:mm:ss");
      const forrmatedCurrentDate = currentDate.format("YYYY-MM-DD HH:mm:ss");
      const nextMonthDate = currentDate.add(1, "months");
      const formattedNextMonthDate = nextMonthDate.format(
        "YYYY-MM-DD HH:mm:ss"
      );
      if (q) {
        query.where[Op.or].push({
          createdAt: {
            [Op.between]: [formattedCurrentDate, formattedNextMonthDate],
          },
        });
      } else {
        query.where = {
          ...query.where,
          createdAt: {
            [Op.between]: [forrmatedCurrentDate, formattedNextMonthDate],
          },
        };
      }
    }
    const { count, rows } = await Reviews.findAndCountAll(query);
    res.status(200).json({ total: count, data: rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addReview = async (req, res) => {
  try {
    const response = await Reviews.create(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateReview = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const response = await Reviews.update(data, {
      where: { id },
    });
    if (response[0] == 0)
      res.status(404).json("Cập nhật thất bại, id không tìm thấy");
    else if (response[0] == 1) res.status(200).json("Cập nhật thành công");
  } catch (err) {
    res.status(500).json({ error: "Bạn chưa cung cấp ID" });
  }
};
exports.deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Reviews.destroy({ where: { id } });
    res.status(201).json("Xóa thành công");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
