const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getKanbanBoard = async (projectId) => {
     
       // Fetch the project with columns and tasks
       const project = await prisma.project.findUnique({
         where: { id: projectId },
         include: {
           columns: {
             include: {
               tasks: {
                 include: {
                   assignedTo: {
                     select: { id: true, username: true, emailAddress: true },
                   },
                   createdBy: {
                     select: { id: true, username: true, emailAddress: true },
                   },
                 },
                 orderBy: { position: "asc" }, // Order tasks by position within the column
               },
             },
             orderBy: { position: "asc" }, // Order columns by position
           },
         },
       });
       
   
       // Transform the data into the required Kanban board structure
       const kanbanBoard = {
         projectId: project.id,
         projectName: project.projectName,
         columns: project.columns.map((column) => ({
           id: column.id,
           title: column.name,
           cardIds: column.tasks.map((task) => task.id),
           cards: column.tasks.map((task) => ({
             id: task.id,
             name: task.taskName,
             description: task.taskDescription,
             status: task.status,
             position: task.position,
             badges: task.badges ? task.badges.map(badge => ({
              label: badge.label,
              color: badge.color
          })) : [{ label: "No Badge", color: "gray" }],
             assignedTo: task.assignedTo
               ? {
                   id: task.assignedTo.id,
                   name: task.assignedTo.username,
                   email: task.assignedTo.emailAddress,
                 }
               : null,
             createdBy: {
               id: task.createdBy.id,
               name: task.createdBy.username,
               email: task.createdBy.emailAddress,
             },
           })),
         })),
       };
   
           return kanbanBoard;
   };
   