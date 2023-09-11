const express = require("express");
const router = express.Router();
const { list, addReview, updateReview, deleteReview } = require("../controller/reviewsController");

router.get("/", list);
router.post("/", addReview);
router.put("/", updateReview);
router.delete("/:id", deleteReview);
module.exports = router;
