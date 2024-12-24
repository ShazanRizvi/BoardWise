const taskSerivce = require("../services/taskService");

exports.createTask = async (req, res) => {
  const {
    projectId,
    taskName,
    taskDescription,
    status,
    position,
    assignedToId,
  } = req.body;
  const userId = req.session.user.id;

  try {
    const task = await taskSerivce.createTask(
      projectId,
      taskName,
      taskDescription,
      status,
      position,
      assignedToId,
      userId
    );

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.assignUserToTask = async (req, res) => {
  const { taskId } = req.params;
  const { assignedToId } = req.body;

  try {
    const task = await taskSerivce.assignUserToTask(taskId, assignedToId);

    res
      .status(200)
      .json({ message: "User assigned to task successfully", task });
  } catch (error) {
    console.error("Error assigning user to task:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.getTasksbyProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await taskSerivce.getTasksbyProject(projectId);
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.updateTaskPostion = async (req, res) => {
  const { taskId } = req.params;
  const { newPosition, newStatus } = req.body;

  try {
    const updatedTask = await taskSerivce.updateTaskPostion(
      taskId,
      newPosition,
      newStatus
    );

    // Broadcast the deleted task event
    const io = req.app.get("socketio");
    io.emit("taskDeleted", updatedTask);

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task", error });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await taskSerivce.deleteTask(taskId);

    // Broadcast the deleted task event
    const io = req.app.get("socketio");
    io.emit("taskDeleted", task);

    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task", error });
  }
};
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { taskName, taskDescription, status, position } = req.body;

  try {
    const updatedTask = await taskSerivce.updateTask(
      taskId,
      taskName,
      taskDescription,
      status,
      position
    );

    // Broadcast the updated task event
    const io = req.app.get("socketio");
    io.emit("taskUpdated", updatedTask);

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task", error });
  }
};
