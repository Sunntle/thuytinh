const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');
const sendEmail = async (email, subject, templateHtml) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });
    try {
        let info = await transporter.sendMail({
            from: 'Thủy Tinh" <thuytinh.com>',
            to: email,
            subject: subject,
            html: templateHtml,
        });
        return info
    } catch (error) {
        throw new Error(error)
    }

}
module.exports = sendEmail