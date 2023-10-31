const moment = require("moment");
const queryString = require("qs");
const crypto = require("crypto");
const request = require("request");
const asyncHandler = require("express-async-handler");
const { Order, Tables } = require("../models");

const sortObj = (obj) => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

exports.createPaymentUrl = asyncHandler(async (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;
  let vnpUrl = process.env.VNP_URL;
  let returnUrl = process.env.VNP_RETURNURL;
  let orderId = moment(date).format("DDHHmmss");
  let amount = req.body.amount
  let bankCode = req.body.bankCode;

  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;

  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObj(vnp_Params);
  let signData = queryString.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + queryString.stringify(vnp_Params, { encode: false });

  res.json(vnpUrl);
});

exports.VnpIPN = asyncHandler(async (req, res) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  // let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObj(vnp_Params);
  let secretKey = process.env.VNP_HASHSECRET;
  let signData = queryString.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  let paymentStatus = "0";

  let checkOrderId = true;
  let checkAmount = true;
  if (secureHash === signed) {
    //kiểm tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus === "0") {
          //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
          if (rspCode === "00") {
            //thanh cong
            //paymentStatus = '1'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
            res.status(200).json({ RspCode: "00", Message: "Success" });
          } else {
            //that bai
            //paymentStatus = '2'
            // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
            res
              .status(200)
              .json({ RspCode: "01", Message: "Fail", data: vnp_Params });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
});

exports.ReturnURL = asyncHandler(async (req, res) => {
  let vnp_Params = req.query;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObj(vnp_Params);

  // let tmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;

  let signData = queryString.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    res.json({ code: vnp_Params["vnp_ResponseCode"] });
  } else {
    res.json({ code: "97" });
  }
});

exports.queryDr = asyncHandler(async (req, res) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  let date = new Date();

  let vnp_TmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;
  let vnp_Api = process.env.VNP_API;

  let vnp_TxnRef = req.body.orderId;
  let vnp_TransactionDate = req.body.transDate;

  let vnp_RequestId = moment(date).format("HHmmss");
  let vnp_Version = "2.1.0";
  let vnp_Command = "querydr";
  let vnp_OrderInfo = "Truy van GD ma:" + vnp_TxnRef;

  let vnp_IpAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // let currCode = "VND";
  let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

  let data =
    vnp_RequestId +
    "|" +
    vnp_Version +
    "|" +
    vnp_Command +
    "|" +
    vnp_TmnCode +
    "|" +
    vnp_TxnRef +
    "|" +
    vnp_TransactionDate +
    "|" +
    vnp_CreateDate +
    "|" +
    vnp_IpAddr +
    "|" +
    vnp_OrderInfo;

  let hmac = crypto.createHmac("sha512", secretKey);
  let vnp_SecureHash = hmac.update(Buffer.from(data, "utf-8")).digest("hex");

  let dataObj = {
    vnp_RequestId: vnp_RequestId,
    vnp_Version: vnp_Version,
    vnp_Command: vnp_Command,
    vnp_TmnCode: vnp_TmnCode,
    vnp_TxnRef: vnp_TxnRef,
    vnp_OrderInfo: vnp_OrderInfo,
    vnp_TransactionDate: vnp_TransactionDate,
    vnp_CreateDate: vnp_CreateDate,
    vnp_IpAddr: vnp_IpAddr,
    vnp_SecureHash: vnp_SecureHash,
  };
  // /merchant_webapi/api/transaction
  request(
    {
      url: vnp_Api,
      method: "POST",
      json: true,
      body: dataObj,
    },
    (error, response, body) => {
      res.status(200).json(body);
    },
  );
});

exports.updateTransactionOrder = asyncHandler(async (req, res) => {
  const { transaction_id, transaction_date, idOrder, payment_gateway } =
    req.body;

  const existingTransactionId = await Order.findOne({
    where: { transaction_id: transaction_id },
  });

  if (existingTransactionId === null) {
    try {
      const orderUpdated = await Order.update(
        {
          transaction_id: transaction_id,
          transaction_date: transaction_date,
          payment_gateway: payment_gateway,
        },
        {
          where: { id: idOrder },
        },
      );

      if (orderUpdated) {
        res.status(200).json({
          orderUpdated
        });
      } else {
        res.status(500).json({ message: "Cập nhật mã giao dịch thất bại" });
      }
    } catch (err) {
      console.log(err);
    }
  }
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const { idTable, idOrder } = req.body;
  try {
    const orderUpdated = await Order.update(
      {
        status: 3,
      },
      {
        where: { id: idOrder },
      },
    );
    // const tableUpdated = await Tables.update(
    //   {
    //     status_table: 0,
    //   },
    //   {
    //     where: {
    //       id: idTable,
    //     },
    //   },
    // );
    // if (orderUpdated && tableUpdated) {
    if (orderUpdated) {
      res
        .status(200)
        .json({ message: "Cập nhật trạng thái của bàn và hóa đơn thành công" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Cập nhật trạng thái của bàn và hóa đơn thất bại",
      err,
    });
  }
});

exports.updateOrderBilling = asyncHandler(async (req, res) => {
  const { payment_gateway, date, idOrder, idTable } = req.body;
  console.log(req.body);
  try {
    const orderUpdated = await Order.update(
      {
        payment_gateway: payment_gateway,
        transaction_date: date,
        status: 3,
      },
      { where: { id: +idOrder } },
    );
    // const tableUpdated = await Tables.update(
    //   {
    //     status_table: 0,
    //   },
    //   {
    //     where: {
    //       id: idTable,
    //     },
    //   },
    // );
    //if (orderUpdated && tableUpdated)
    if (orderUpdated)
      res.status(200).json({ message: "thanh cong" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
