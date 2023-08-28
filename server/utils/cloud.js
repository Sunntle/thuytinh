const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
});

const destroyImg = async (url) => {
    const public_id = url.split("/").at(-1).split(".")[0];
    await cloudinary.uploader.destroy("NhaHangThuyTinh/" + public_id);
}
module.exports = { cloudinary, destroyImg };
//https://res.cloudinary.com/dw6jih4yt/image/upload/w_400,h_300/v1693195759/NhaHangThuyTinh/glmc8t0umyuuekgl2kxj.png