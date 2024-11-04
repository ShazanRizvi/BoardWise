const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
     const { organizationId, productName } = req.body;
 
     try {
         const product = await productService.createProduct(organizationId, productName);
         res.status(201).json({ message: 'Product created successfully', product });
     } catch (error) {
         res.status(400).json({ message: error.message });
     }
 };