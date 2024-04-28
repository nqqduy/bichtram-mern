const Product = require("../../models/Product");

class ProductService {
  static async createProduct(data) {
    const insertData = {
      price: data.price,
      product_type: data.product_type,
      brands: data.brands,
      product_name: data.product_name,
      images: data.images,
      variants: data.variants,
      tab_data: data.tab_data,
    };

    const newProduct = new Product(insertData);
    return await newProduct.save();
  }

  static async deleteProduct(productId) {
    await Product.findByIdAndDelete(productId);
  }

  static async getAllProduct() {
    return await Product.find().lean();
  }
}

module.exports = ProductService;
