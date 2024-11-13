// services/userService.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUserDetails = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      // Use `select` to specify fields and exclude `password`
      id: true,
      username: true,
      emailAddress: true,
      loginType: true,
      organization: {
        select: {
          id: true,
          organizationName: true,
          orgLogo: true,
          products: {
            select: {
              id: true,
              productName: true,
              organizationId: true,
              projects: {
                select: {
                  id: true,
                  projectName: true,
                  productId: true,
                  organizationId: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
