// services/projectService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProject = async (productId, organizationId, userId, projectName) => {
    return await prisma.project.create({
        data: {
            projectName,
            product: { connect: { id: productId } },            // Connect project to a single product
            organization: { connect: { id: organizationId } },  // Link project to organization
            users: { connect: { id: userId } }                  // Link project to the creating user(s)
        },
    });
};

exports.getProjects = async (userId) => {
    const projects = await prisma.project.findMany({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
        include: {
          product: true, // Include product details if needed
          organization: true, // Include organization details if needed
        },
      });
      return projects;
};