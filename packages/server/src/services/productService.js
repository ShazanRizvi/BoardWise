const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProduct = async (organizationId, userId, productName, description) => {
  return await prisma.product.create({
    data: {
      productName,
      description,
      organization: { connect: { id: organizationId } },
      users: {
        create: [
          {
            user: { connect: { id: userId } },
          },
        ],
      },
    },
  });
};

exports.getProducts = async (userId) => {
  const products = await prisma.product.findMany({
    where: {
      users: {
        some: {
          userId: userId, // Match the userId in ProductAccess
        },
      },
    },
    include: {
      projects: true, // Include associated projects
      organization: true, // Include organization details
      users: {
        include: {
          user: true, // Include user details from ProductAccess
        },
      },
    },
  });
  return products;
};

exports.addUserToProduct = async (userId, productId, accessLevel) => {
  const productsofUser=await prisma.productAccess.create({
    data: {
      userId,
      productId,
      accessLevel,
    },
  });
  return productsofUser;
}