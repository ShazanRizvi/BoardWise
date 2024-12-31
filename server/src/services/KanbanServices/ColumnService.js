exports.createColumn = async (name, position,projectId) => {
     const column = await prisma.column.create({
          data: {
            name,
            position,
            projectId,
          },
        });

        return column;
}