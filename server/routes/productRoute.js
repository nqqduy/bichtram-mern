const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
 try {
   const products = await Product.find({});
   res.json(products);
 } catch (error) {
   res.status(500).json({ error: 'Internal Server Error' });
 }
});

router.get('/products/:id', async (req, res) => {
 try {
   const product = await Product.findById(req.params.id);
   if (!product) return res.status(404).send('Product not found');
   res.send(product);
 } catch (err) {
   res.status(500).send(err);
 }
});

router.get('/products/brand/:brand', async (req, res) => {
  const { brand } = req.params;
  try {
   const products = await Product.find({ brands : brand });
   if (!products || products.length === 0) return res.status(404).send('No products found for this brand');
   res.send(products);
  } catch (err) {
   res.status(500).send(err);
  }
 });

 router.get('/products/type/:type', async (req, res) => {
  const { type } = req.params;
  console.log(type);
  try {
   const products = await Product.find({ product_type : type });
   if (!products || products.length === 0) return res.status(404).send('No products found for this type');
   res.send(products);
  } catch (err) {
   res.status(500).send(err);
  }
 });

 router.get('/brands', async (req, res) => {
  try {
    let brands = [];
    const products = await Product.find();
    for (let product of products) {
      if (!brands.includes(product.brands)) {
        brands.push(product.brands);
      }
    }
    res.send(brands);
  } catch (err) {
    res.status(500).send(err);
  }
 });

 router.get('/types', async (req, res) => {
  try {
    let types = new Set();
    const products = await Product.find();
    for (let product of products) {
      types.add(product.product_type);
    }
    res.send(Array.from(types));
  } catch (err) {
    res.status(500).send(err);
  }
 });
 

module.exports = router;