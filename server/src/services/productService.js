const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProduct = async (organizationId, productName) => {
     return await prisma.product.create({
         data: {
             productName,
             organization: { connect: { id: organizationId } },
         },
     });
 };