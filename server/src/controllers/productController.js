const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
    const { productName } = req.body;
    const userId = req.session.userId;
    const organizationId = req.session.organizationId;

    if (!userId || !organizationId) {
        return res.status(400).json({ message: 'User or organization not found in session' });
    }

    try {
        const product = await productService.createProduct(organizationId, userId, productName);
        req.session.productId = product.id; // Store productId in session
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};