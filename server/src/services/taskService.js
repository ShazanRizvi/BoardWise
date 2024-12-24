const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createTask = async (
  projectId,
  taskName,
  taskDescription,
  status,
  position,
  assignedToId,
  userId
) => {
  const task = await prisma.task.create({
    data: {
      taskName,
      taskDescription,
      status,
      position,
      project: { connect: { id: projectId } }, // Link to project
      createdBy: { connect: { id: userId } }, // Link to task creator
      ...(assignedToId && { assignedTo: { connect: { id: assignedToId } } }), // Optionally assign a user
    },
    include: {
      assignedTo: true, // Include assigned user details
      createdBy: true, // Include creator details
    },
  });
  return task;
};
exports.assignUserToTask = async (taskId, assignedToId) => {
  const task = await prisma.task.update({
    where: { id: taskId },
    data: {
      assignedTo: { connect: { id: assignedToId } },
    },
    include: {
      assignedTo: true,
    },
  });
  return task;
};

exports.getTasksbyProject = async (projectId) => {
  const tasks = await prisma.task.findMany({
    where: { projectId },
    include: {
      assignedTo: true, // Include assigned user details
      createdBy: true, // Include creator details
    },
  });
  return tasks;
};

exports.updateTaskPostion = async (taskId, newPosition, newStatus) => {
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      position: newPosition,
      status: newStatus,
    },
  });
  return updatedTask;
};

exports.deleteTask = async (taskId) => {
  const deletedTask = await prisma.task.delete({
    where: { id: taskId },
  });
  return deletedTask;
};

exports.updateTask = async (taskName, taskDescription, status, position) => {
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...(taskName && { taskName }),
      ...(taskDescription && { taskDescription }),
      ...(status && { status }),
      ...(position && { position }),
    },
  });
  return updatedTask;
};
