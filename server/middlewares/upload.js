const { cloudinary } = require('../utils/cloud')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "NhaHangThuyTinh",
    // background_removal: "cloudinary_ai" // remove background
    format: async (req, file) => "webp", // Changed this to return "png" for the format
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
