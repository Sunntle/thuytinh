const {
  createPaymentUrl,
  ReturnURL,
  VnpIPN,
} = require("../controller/paymentController");
const express = require("express");
const router = express.Router();

router.post("/create_payment_url", createPaymentUrl);
router.get("/vnpay_return", ReturnURL);
router.get("/vnpay_ipn", VnpIPN);

module.exports = router;
