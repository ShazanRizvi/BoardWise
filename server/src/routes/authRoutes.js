const express = require("express");
const authController = require("../controllers/authController");
const authorizeRole = require("../middlewares/RBAMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/auth/invite:
 *   post:
 *     summary: Invite a new user
 *     description: This endpoint allows an Admin to send an invitation to a new user. It generates a tokenized invite link for account activation.
 *     tags:
 *       - Invite Users to Org
 *     security:
 *       - bearerAuth: [] # Assuming Bearer token authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 description: The email address of the user to invite.
 *                 example: "user@example.com"
 *               userRole:
 *                 type: string
 *                 description: The role to assign to the invited user.
 *                 example: "Editor"
 *               userOrgPosition:
 *                 type: string
 *                 description: The position of the user within the organization.
 *                 example: "Manager"
 *     responses:
 *       201:
 *         description: Invitation successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invite created successfully"
 *                 inviteLink:
 *                   type: string
 *                   description: The generated invite link for account activation.
 *                   example: "https://frontend-host/activate-account?token=abcd1234"
 *                 emailAddress:
 *                   type: string
 *                   description: The email address the invitation was sent to.
 *                   example: "user@example.com"
 *       400:
 *         description: Bad Request. An error occurred while creating the invite.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email address"
 *       403:
 *         description: Forbidden. User does not have the required role.
 *       401:
 *         description: Unauthorized. User is not authenticated.
 */
router.post("/invite", authorizeRole(["Admin"]), authController.createInvite);
/**
 * @swagger
 * /api/auth/activate:
 *   post:
 *     summary: Activate a invited user's account
 *     description: Activates a user account using a token and sets their username and password.
 *     tags:
 *       - Invite Users to Org
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The activation token sent to the user's email.
 *                 example: "abcd1234"
 *               username:
 *                 type: string
 *                 description: The username for the user's account.
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: The password for the user's account.
 *                 example: "securepassword123"
 *     responses:
 *       201:
 *         description: Account activated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account activated successfully"
 *                 user:
 *                   type: object
 *                   description: The user details.
 *       400:
 *         description: Bad Request. An error occurred during account activation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid activation token"
 */
router.post("/activate", authController.activateAccount);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and return a session token.
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", authController.login);
/**
 * @swagger
 * /api/auth/SignUp:
 *   post:
 *     summary: Admin User SignUp (Onboarding step 1)
 *     description: Sign up user while in onboarding
 *     tags:
 *       - Admin User Onboarding
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                type: string
 *               emailAddress:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful Sign Up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/signup", authController.signUp);

module.exports = router;
