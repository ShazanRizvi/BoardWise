const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
    const { productName, description } = req.body;
    const userId = req.session.user.id;
    const organizationId = req.session.organizationId;

    if (!userId || !organizationId) {
        return res.status(400).json({ message: 'User or organization not found in session' });
    }

    try {
        const product = await productService.createProduct(organizationId, userId, productName, description);
        req.session.productId = product.id; // Store productId in session
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
      // Retrieve the user ID from the session
      const userId = req.session.user.id;
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized. No user in session." });
      }
  
      // Fetch the user's products
      const products = await productService.getProducts(userId);
  
      res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.addUserToProduct = async (req, res) => {
    const { userId, productId, accessLevel } = req.body;
    const adminId = req.session.user.id; // Admin ID from the session
  
    try {
      // Ensure the user making the request is an Admin
      const adminRoles = await prisma.productAccess.findFirst({
        where: { userId: adminId, productId, accessLevel: 'Admin' },
      });
  
      if (!adminRoles) {
        return res.status(403).json({ message: 'Only admins can add users to products.' });
      }
  
      // Add the user to the product
      const productAccess = await productService.addUserToProduct(userId, productId, accessLevel);
  
      res.status(201).json({ message: 'User added to product successfully', productAccess });
    } catch (error) {
      console.error('Error adding user to product:', error.message);
      res.status(500).json({ message: 'Error adding user to product' });
    }
  };
  