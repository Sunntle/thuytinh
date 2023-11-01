const { ImageProduct } = require("../models");
const { Op, where } = require("sequelize");
const cloudinary = require("cloudinary").v2;
exports.getAllImagesInCloud = async (req, res) => {
  try {
    const {_limit, _offset,...rest} = req.body
    const options = { resource_type: 'image', type: 'upload', max_results: _limit ?? 500 };
    cloudinary.api.resources(options, function (error, result) {
      if (error) {
        console.error('Error:', error);
      } else {
        res.status(200).json(result.resources);
      }
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addNew = async (req, res) => {
  try {
    const images = req.files;
    const data = images.map((file) => ({
      url: file.path.replace("/upload/", "/upload/w_400,h_300/"),
    }));
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.addNewById = async (req, res) => {
  try {
    const images = req.files;
    const idProduct = req.body.idProduct;
    const data = images.map((file) => ({
      url: file.path.replace("/upload/", "/upload/w_400,h_300/"),
      id_product: idProduct,
    }));
    const response = await ImageProduct.bulkCreate(data);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removeImgByUrl = async (req, res) => {
  try {
    const public_id = req.query.url.split("/").at(-1).split(".")[0];
    await cloudinary.uploader.destroy("NhaHangThuyTinh/" + public_id);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.removeImgById = async (req, res) => {
  try {
    const id = req.params.id;
    await ImageProduct.destroy({ where: { id: id }, individualHooks: true });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
