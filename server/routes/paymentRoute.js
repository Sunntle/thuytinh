const {
  createPaymentUrl,
  ReturnURL,
  VnpIPN,
  updateTransactionOrder,
  queryDr,
  updateStatus,
} = require("../controller/paymentController");
const express = require("express");
const router = express.Router();

router.post("/create_payment_url", createPaymentUrl);
router.get("/vnpay_return", ReturnURL);
router.get("/vnpay_ipn", VnpIPN);
router.post("/vnpay_querydr", queryDr);
router.put("/update_transaction", updateTransactionOrder);
router.put("/update_status", updateStatus);

module.exports = router;
