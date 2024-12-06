const express = require('express');
const productController = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/create_product',authenticate, productController.createProduct);
router.get('/products',authenticate, productController.getProducts);

module.exports = router;