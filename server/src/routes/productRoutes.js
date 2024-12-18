const express = require('express');
const productController = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();
/**
 * @swagger
 * /api/create_product:
 *   post:
 *     summary: Create a new product
 *     description: Allows an authenticated user to create a product within their organization. The product ID is stored in the session after creation.
 *     tags:
 *       - Admin User Onboarding
 *     security:
 *       - bearerAuth: [] # Use bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: The name of the product.
 *                 example: "Project Management Tool"
 *               description:
 *                 type: string
 *                 description: A brief description of the product.
 *                 example: "A tool for managing projects and tasks effectively."
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product created successfully"
 *                 product:
 *                   type: object
 *                   description: Details of the created product.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the product.
 *                       example: "prod123"
 *                     name:
 *                       type: string
 *                       description: The name of the product.
 *                       example: "Project Management Tool"
 *                     description:
 *                       type: string
 *                       description: The description of the product.
 *                       example: "A tool for managing projects and tasks effectively."
 *       400:
 *         description: Bad Request. Possible causes include missing user or organization in session or invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User or organization not found in session"
 */

router.post('/create_product',authenticate, productController.createProduct);
/**
 * @swagger
 * /api/products/products:
 *   get:
 *     summary: Get products for the logged-in user
 *     description: Retrieves a list of products associated with the logged-in user based on the session information.
 *     tags:
 *       - Get Resources
 *     security:
 *       - bearerAuth: [] # Use bearer token for authentication
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Products retrieved successfully"
 *                 products:
 *                   type: array
 *                   description: List of products associated with the user.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique ID of the product.
 *                         example: "prod123"
 *                       name:
 *                         type: string
 *                         description: The name of the product.
 *                         example: "Project Management Tool"
 *                       description:
 *                         type: string
 *                         description: A brief description of the product.
 *                         example: "A tool to manage projects and tasks."
 *       401:
 *         description: Unauthorized. No user is logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized. No user in session."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get('/products',authenticate, productController.getProducts);

module.exports = router;