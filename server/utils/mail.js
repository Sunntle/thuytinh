const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');
const sendEmail = asyncHandler(async (email, html) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });


    let info = await transporter.sendMail({
        from: '"Thủy Kinh" <thuytinh.com>',
        to: email,
        subject: "Forgot Password ✔",
        html: html,
    });
    return info
})
module.exports = sendEmail