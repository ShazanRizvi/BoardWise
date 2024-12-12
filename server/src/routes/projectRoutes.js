const express = require("express");
const projectController = require("../controllers/projectController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();
router.post(
  ["/create_project", "/create_project/:productId"],
  authenticate,
  projectController.createProject
);
router.get("/projects", authenticate, projectController.getProjects);
router.get(
  "/product/:productId/projects",
  authenticate,
  projectController.getProjectByProduct
);

module.exports = router;
