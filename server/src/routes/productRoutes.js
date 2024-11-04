const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();
router.post('/create_product', productController.createProduct);

module.exports = router;