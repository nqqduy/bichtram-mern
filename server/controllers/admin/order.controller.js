const OrderAdminService = require("../../services/admin/order.service");

class OrderController {
  static async getAllOrder(req, res, next) {
    try {
      const products = await OrderAdminService.getAllOrder();
      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  }
  static async getOneOrder(req, res) {
    try {
      const product = await OrderAdminService.getOneOrder();
      return res.status(201).json({ message: "Successfully", product });
    } catch (error) {
      next(error);
    }
  }

  static async updateOrder(req, res) {
    const productId = req.params.productId;
    try {
      await OrderAdminService.updateOrder(productId);
      res.status(204).json({ data: 1 });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
