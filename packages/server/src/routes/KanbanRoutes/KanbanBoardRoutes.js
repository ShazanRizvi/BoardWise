const kanbanBoardController = require("../../controllers/KanabanControllers/KanbanBoardController")
const authenticate = require('../../middlewares/authMiddleware');

const express = require("express");
const router = express.Router();

router.get("/:projectId",authenticate, kanbanBoardController.getKanbanBoard);

module.exports = router;