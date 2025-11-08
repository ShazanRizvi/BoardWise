const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /api/users/details:
 *   get:
 *     summary: Get user details (Current Logged in user)
 *     description: Retrieves details of the authenticated user based on the user ID stored in the session.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: [] # Use bearer token for authentication
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User details retrieved successfully"
 *                 data:
 *                   type: object
 *                   description: Details of the user.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the user.
 *                       example: "user123"
 *                     name:
 *                       type: string
 *                       description: The name of the user.
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       description: The role of the user.
 *                       example: "Admin"
 *       400:
 *         description: User not authenticated or missing in session.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not authenticated"
 *       404:
 *         description: User details not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User details not found"
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

router.get('/details', userController.getUserDetails);

module.exports = router;