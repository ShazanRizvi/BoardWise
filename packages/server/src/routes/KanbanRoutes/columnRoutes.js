const express = require("express");
const router = express.Router();
const columnController = require("../../controllers/KanabanControllers/columnController");
const authenticate = require('../../middlewares/authMiddleware');

// Get all columns for a project
router.get("/:projectId",authenticate, columnController.getColumnsByProjectId);

// Create a new column
router.post("/create_column",authenticate ,columnController.createColumn);

// Update a column
router.put("/:columnId",authenticate, columnController.updateColumn);

// Delete a column
router.delete("/:columnId",authenticate, columnController.deleteColumn);

// Reorder columns

module.exports = router;