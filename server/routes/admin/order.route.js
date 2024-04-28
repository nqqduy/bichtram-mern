const express = require("express");
const router = express.Router();
const OrderController = require("../../controllers/admin/order.controller");

router.get("/", OrderController.getAllOrder);
router.patch("/:productId", OrderController.updateOrder);

module.exports = router;
