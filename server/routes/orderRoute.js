const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { default: mongoose } = require("mongoose");

// BASE URL : Order
//body : products : [{productId, quantity, productPrice}]
router.post("/", authMiddleware, async (req, res) => {
  const { userId } = req.user;
  const { products } = req.body;

  try {
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Products not found" });
    }

    const productsFound = await Product.find()
      .where("_id")
      .in(products.map((product) => product.productId))
      .exec();

    if (productsFound.length !== products.length) {
      return res
        .status(400)
        .json({ success: false, message: "Some products not found" });
    }

    const totalPrice = products.reduce(
      (acc, product) => acc + product.productPrice * product.quantity,
      0
    );

    const orderCreated = await Order.create({
      products: products.map((product) => ({
        id: product.productId,
        quantity: product.quantity,
        productPrice: product.productPrice,
      })),
      totalPrice,
      userId: userId,
    });

    res.json({
      success: true,
      message: "Order created successfully",
      order: orderCreated,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
});

module.exports = router;
