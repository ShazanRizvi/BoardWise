// services/projectService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProject = async (productId, organizationId, userId, projectName, description) => {
    return await prisma.project.create({
        data: {
            projectName,
            description,
            product: { connect: { id: productId } },            // Connect project to a single product
            organization: { connect: { id: organizationId } },  // Link project to organization
            users: { connect: { id: userId } }                  // Link project to the creating user(s)
        },
        include: {
          product: true, // Include the associated product in the response
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

exports.getProjectsByProduct = async (productId) => {
  const projects = await prisma.project.findMany({
    where: { productId },
    include: {
      users: true, 
      tasks: true, 
    },
  });
  return projects;
}