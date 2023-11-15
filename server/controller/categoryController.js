const { Category, Product } = require("../models");
const { apiQueryRest } = require('../utils/const')
exports.list = async (req, res) => {
  try {
    let query = {
      include: { model: Product },
      ...apiQueryRest({ ...req.query, title: 'name_category' })
    };
    const response = await Category.findAll(query);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addCate = async (req, res) => {
  try {
    const thumbnail = req.file.path.replace("/upload/", "/upload/w_400,h_300/");
    const data = { thumbnail, ...req.body };
    const response = await Category.create(data);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateCate = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const thumbnail = req?.file?.path?.replace(
      "/upload/",
      "/upload/w_400,h_300/"
    );
    if (thumbnail) {
      const data = { thumbnail, ...rest };
      await Category.update(data, {
        where: { id },
        individualHooks: true,
      });
    } else {
      await Category.update(rest, {
        where: { id },
      });
    }

    res.status(200).json("Cập nhật danh mục thành công !");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removeCate = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.destroy({
      where: { id },
      include: { model: Product },
      individualHooks: true,
    }).catch(console.log)
    res.status(200).json("Xóa danh mục thành công");
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
