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
    const year = moment().year();
    if (_time) {
      const currentTime = new Date(year, Number(_time) - 1, 1)
      const nextTime = new Date(year, Number(_time), 1)
      if (q) {
        query.where[Op.or].push({
          createdAt: {
            [Op.between]: [currentTime, nextTime],
          },
        });
      } else {
        query.where = {
          ...query.where,
          createdAt: {
            [Op.between]: [currentTime, nextTime],
          },
        };
      }
    }
    const { count, rows } = await Reviews.findAndCountAll(query);
    const previousMonthReviews = await Reviews.findAndCountAll({
      include: [{ model: Order, attributes: ["createdAt"] }],
      order: [["createdAt", "DESC"]],
      where: {
        createdAt: {
          [Op.between]: [
            new Date(year, Number(_time) - 2, 1),
            new Date(year, Number(_time) - 1, 1),
          ],
        },
      },
    });
    let percentChange = 0;
    if (previousMonthReviews.count > 0) {
      percentChange = Math.round(((count - previousMonthReviews.count) / previousMonthReviews.count) * 100);
    }else if(previousMonthReviews.count == 0){
      percentChange = Math.round(count == 0 ? 0 : 100)
    }
    res.status(200).json({ total: count, data: rows, percentChange });
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
