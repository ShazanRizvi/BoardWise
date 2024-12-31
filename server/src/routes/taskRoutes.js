const express = require("express");
const taskController = require("../controllers/KanabanControllers/taskController");
const authenticate = require("../middlewares/authMiddleware");
const authorizeRole = require("../middlewares/RBAMiddleware");

const router = express.Router();

//Create a Task
router.post('/create_task',authorizeRole(["Admin"]), taskController.createTask);

//Assign a User to a Task
router.put('/:taskId/assign_user_to_task',authorizeRole(["Admin"]), taskController.assignUserToTask);

//Move a Task on the board
router.put("/:taskId/update_position", authorizeRole(["Admin"]), taskController.updateTaskPostion);

//Get all tasks by project
router.get('/:projectId',authenticate, taskController.getTasksbyProject);

//Delete a Task
router.delete("/:taskId/delete", authorizeRole(["Admin"]), taskController.deleteTask);




module.exports = router;