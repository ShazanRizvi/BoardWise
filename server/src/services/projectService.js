// services/projectService.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProject = async (
  productId,
  organizationId,
  userId,
  projectName,
  description
) => {
  const project = await prisma.project.create({
    data: {
      projectName,
      description,
      product: { connect: { id: productId } }, // Connect the project to the product
      organization: { connect: { id: organizationId } }, // Link project to organization
    },
    include: {
      product: true, // Include the associated product in the response
    },
  });

  // Step 2: Create ProjectAccess
  await prisma.projectAccess.create({
    data: {
      canEdit: true, // Adjust the access level as needed
      user: { connect: { id: userId } }, // Link the user
      project: { connect: { id: project.id } }, // Link the project
    },
  });

  // Step 3: Return the project details, including associated data
  return prisma.project.findUnique({
    where: { id: project.id },
    include: {
      product: true, // Include associated product
      users: {
        include: {
          user: true, // Include user details from ProjectAccess
        },
      },
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
      users: {
        include: {
          user: {
            // This is the relation in `ProjectAccess` that connects to the `User` model
            select: {
              id: true,
              username: true,
              emailAddress: true,
              userOrgPosition: true,
            },
          },
        },
      },
      tasks: true,
      product: true,
    },
  });
  return projects;
};

exports.addUserToProject = async (userId, projectId, accessLevel) => {
  const projectofUser = await prisma.projectAccess.create({
    data: {
      userId,
      projectId,
      accessLevel,
    },
  });
  return projectofUser;
};

exports.getProjectById = async (projectId) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      product: {
        // Include product details
        select: {
          id: true,
          productName: true,
          description: true,
        },
      },
      tasks: {
        // Include task details
        select: {
          id: true,
          taskName: true,
          taskDescription: true,
          status: true,
          position: true,
          assignedTo: {
            // Include user assigned to the task
            select: {
              id: true,
              username: true,
              emailAddress: true,
            },
          },
          createdBy: {
            // Include user who created the task
            select: {
              id: true,
              username: true,
              emailAddress: true,
            },
          },
        },
      },
      users: {
        // Include users with project access
        include: {
          user: {
            select: {
              id: true,
              username: true,
              emailAddress: true,
              userOrgPosition: true,
            },
          },
        },
      },
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};
