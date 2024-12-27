const express = require("express");
const projectController = require("../controllers/projectController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();
/**
 * @swagger
 * /api/projects/create_project:
 *   post:
 *     summary: Create a new project
 *     description: Allows an authenticated user to create a project for a specific product within their organization. The product ID can be provided in the session or as a URL parameter.
 *     tags:
 *       - Admin User Onboarding
 *     security:
 *       - bearerAuth: [] # Use bearer token for authentication
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: false
 *         schema:
 *           type: string
 *         description: The ID of the product to associate the project with. If not provided in the URL, it will use the product ID from the session.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 description: The name of the project.
 *                 example: "Task Automation Project"
 *               description:
 *                 type: string
 *                 description: A brief description of the project.
 *                 example: "A project to automate repetitive tasks and improve efficiency."
 *     responses:
 *       201:
 *         description: Project created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project created successfully"
 *                 project:
 *                   type: object
 *                   description: Details of the created project.
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the project.
 *                       example: "proj123"
 *                     name:
 *                       type: string
 *                       description: The name of the project.
 *                       example: "Task Automation Project"
 *                     description:
 *                       type: string
 *                       description: A brief description of the project.
 *                       example: "A project to automate repetitive tasks and improve efficiency."
 *       400:
 *         description: Bad Request. Possible causes include missing user, organization, or product in session, or invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User, organization, or product not found in session"
 */
/**
 * @swagger
 * /api/create_project/{productId}:
 *   post:
 *     summary: Create a project for a specific product ID
 *     description: Creates a new project for the given product ID, overriding the default product in the session.
 *     tags:
 *       - Create Project for Product
 *     security:
 *       - bearerAuth: [] # Use bearer token for authentication
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to associate with the project.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectName:
 *                 type: string
 *                 description: The name of the project.
 *                 example: "Task Automation Project"
 *               description:
 *                 type: string
 *                 description: A brief description of the project.
 *                 example: "A project to automate repetitive tasks."
 *     responses:
 *       201:
 *         description: Project created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project created successfully"
 *                 project:
 *                   type: object
 *                   description: Details of the created project.
 *       400:
 *         description: Bad request due to missing or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User, organization, or product not found in session"
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

router.post(
  ["/create_project", "/create_project/:productId"],
  authenticate,
  projectController.createProject
);
/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get projects for the logged-in user
 *     description: Retrieves a list of projects associated with the logged-in user based on the session information.
 *     tags:
 *       - Get Resources
 *     security:
 *       - bearerAuth: [] # Use bearer token for authentication
 *     responses:
 *       200:
 *         description: Projects retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Projects retrieved successfully"
 *                 projects:
 *                   type: array
 *                   description: List of projects associated with the user.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique ID of the project.
 *                         example: "proj123"
 *                       name:
 *                         type: string
 *                         description: The name of the project.
 *                         example: "Task Automation Project"
 *                       description:
 *                         type: string
 *                         description: A brief description of the project.
 *                         example: "A project to automate repetitive tasks."
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

router.get("/projects", authenticate, projectController.getProjects);
/**
 * @swagger
 * /api/projects/product/{productId}/projects:
 *   get:
 *     summary: Get projects by product ID
 *     description: Retrieves a list of projects associated with a specific product.
 *     tags:
 *       - Get Resources
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve projects for.
 *     responses:
 *       200:
 *         description: Projects retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Projects retrieved successfully"
 *                 projects:
 *                   type: array
 *                   description: List of projects associated with the product.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The unique ID of the project.
 *                         example: "proj123"
 *                       name:
 *                         type: string
 *                         description: The name of the project.
 *                         example: "Task Automation Project"
 *                       description:
 *                         type: string
 *                         description: A brief description of the project.
 *                         example: "A project to automate repetitive tasks."
 *       400:
 *         description: Bad Request. Missing or invalid product ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product ID is required"
 *       404:
 *         description: No projects found for the given product ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No projects found for this product"
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

router.get(
  "/product/:productId/projects",
  authenticate,
  projectController.getProjectByProduct
);

router.get("/:projectId", authenticate, projectController.getProjectById);

module.exports = router;
