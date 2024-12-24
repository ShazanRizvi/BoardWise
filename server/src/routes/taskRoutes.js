const express = require("express");
const taskController = require("../controllers/taskController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/create_task',authenticate, taskController.createTask);
module.exports = router;