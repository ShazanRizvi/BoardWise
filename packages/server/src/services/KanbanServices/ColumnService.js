const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();




exports.createColumn = async (name, position, projectId) => {
  const column = await prisma.column.create({
    data: {
      name,
      position,
      projectId,
    },
  });

  return column;
};

exports.updateColumn = async (columnId, name, position) => {
  const column = await prisma.column.update({
    where: { id: columnId },
    data: {
      ...(name && { name }),
      ...(position && { position }),
    },
  });

  return column;
};

exports.deleteColumn = async (columnId) => {
  const column = await prisma.column.delete({
    where: { id: columnId },
  });

  return column;
};


exports.getColumnsByProject = async (projectId) => {
     const columns = await prisma.column.findMany({
          where: { projectId },
          include: {
            tasks: {
              include: {
                assignedTo: {
                  select: { id: true, username: true, emailAddress: true },
                },
              },
            },
          },
        });

        return columns
}
