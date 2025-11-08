const express = require('express');
const organizationController = require('../controllers/organizationController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/organizations/createorg:
 *   post:
 *     summary: Create a new organization (Onboarding step 2)
 *     description: This endpoint allows an authenticated user to create a new organization. The organization ID is stored in the session after creation.
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
 *               organizationName:
 *                 type: string
 *                 description: The name of the organization.
 *                 example: "Tech Innovators"
 *               orgLogo:
 *                 type: string
 *                 description: URL or base64 string of the organization's logo.
 *                 example: "https://example.com/logo.png"
 *     responses:
 *       201:
 *         description: Organization created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Organization created successfully"
 *                 organization:
 *                   type: object
 *                   description: The details of the created organization.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the organization.
 *                       example: "org123"
 *                     name:
 *                       type: string
 *                       description: The name of the organization.
 *                       example: "Tech Innovators"
 *                     logo:
 *                       type: string
 *                       description: URL or base64 string of the organization's logo.
 *                       example: "https://example.com/logo.png"
 *       400:
 *         description: Bad Request. Possible causes include missing user authentication or invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not authenticated"
 */

router.post('/createorg',authenticate, organizationController.createOrganization);
/**
 * @swagger
 * /api/organizations/organization:
 *   get:
 *     summary: Get organization details for the logged-in user
 *     description: Retrieves the organization associated with the logged-in user based on the session information.
 *     tags:
 *       - Get Resources
 *     security:
 *       - bearerAuth: [] # Use bearer token for authentication
 *     responses:
 *       200:
 *         description: Organization retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Organization retrieved successfully"
 *                 organization:
 *                   type: object
 *                   description: Details of the organization.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the organization.
 *                       example: "org123"
 *                     name:
 *                       type: string
 *                       description: The name of the organization.
 *                       example: "Tech Innovators"
 *                     logo:
 *                       type: string
 *                       description: URL or base64 string of the organization's logo.
 *                       example: "https://example.com/logo.png"
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
 *       404:
 *         description: No organization found for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No organization found for the user."
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

router.get('/organization',authenticate, organizationController.getOrganization);
/**
 * @swagger
 * /api/organizations/users:
 *   get:
 *     summary: Get users by organization
 *     description: Retrieves a list of users associated with the organization of the logged-in user. The organization ID is retrieved from the session.
 *     tags:
 *       - Get Resources
 *     security:
 *       - bearerAuth: [] # Use bearer token for authentication
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   description: List of users in the organization.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique ID of the user.
 *                         example: "user123"
 *                       name:
 *                         type: string
 *                         description: The name of the user.
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         description: The email address of the user.
 *                         example: "john.doe@example.com"
 *       400:
 *         description: Organization not found in session.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Organization not found in session"
 *       500:
 *         description: Internal server error while fetching users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching users"
 */

router.get('/users',authenticate, organizationController.getUsersByOrganization);

module.exports = router;