const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createProduct = async (organizationId, userId, productName) => {
  return await prisma.product.create({
    data: {
      productName,
      organization: { connect: { id: organizationId } },
      users: { connect: { id: userId } },
    },
  });
};

exports.getProducts = async (userId) => {
  const products = await prisma.product.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      projects: true, // Include projects if needed
      organization: true, // Include organization details if needed
    },
  });
  return products;
};
