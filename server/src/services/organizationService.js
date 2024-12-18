const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// exports.getById = async (id) => {
//      return await prisma.organization.findUnique({
//          where: {
//              id: id,
//          },
//      });
//  };

exports.getOrganization = async (userId) => {
    const organization = await prisma.organization.findFirst({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
        include: {
          users: true, // Include users if needed
          products: true, // Include products if needed
          projects: true, // Include projects if needed
        },
      });
      return organization;
}
 exports.createOrganization = async (userId, organizationName, orgLogo) => {
    // Step 1: Create the organization
    const organization = await prisma.organization.create({
        data: {
            organizationName,
            orgLogo,
        },
    });

    // Step 2: Link the organization to the existing user
    await prisma.user.update({
        where: { id: userId },
        data: {
            organizationId: organization.id,
        },
    });

    // Return the created organization
    return organization;
};
  
exports.getUsersByOrganization = async (organizationId) => {
  const users = await prisma.user.findMany({
    where: { organizationId },
    select: {
      id: true,
      username: true,
      emailAddress: true,
      userOrgPosition: true,
      userRole: {
        select: {
          name: true, // Fetch role name
        },
      },
      products: {
        select: {
          product: {
            select: {
              id: true,
              productName: true,
            },
          },
        },
      },
      projects: {
        select: {
          project: {
            select: {
              id: true,
              projectName: true,
            },
          },
        },
      },
    },
  });

  // Fetch all invite tokens for the organization
  const inviteTokens = await prisma.inviteToken.findMany({
    where: { organizationId },
    select: {
      token: true,
      emailAddress: true,
      isUsed: true,
      expiresAt: true,
    },
  });
  

  const usersWithInviteInfo = users.map((user) => {
    const userInvite = inviteTokens.find(
      (invite) => invite.emailAddress === user.emailAddress
    );

    return {
      id: user.id,
      username: user.username,
      emailAddress: user.emailAddress,
      userOrgPosition: user.userOrgPosition,
      role: user.userRole.map((role) => role.name), // Flatten roles
      products: user.products.map((p) => ({
        id: p.product.id,
        name: p.product.productName,
      })),
      projects: user.projects.map((p) => ({
        id: p.project.id,
        name: p.project.projectName,
      })),
      inviteLink: userInvite
        ? `${process.env.BOARDWISE_FRONTEND_HOST}/activate-account?token=${userInvite.token}`
        : null,
      inviteStatus: userInvite
        ? userInvite.isUsed
          ? "Used"
          : "Pending"
        : "Not Invited",
    };
  });

  return usersWithInviteInfo;
};
