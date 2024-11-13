const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProduct = async (organizationId,userId, productName) => {
     return await prisma.product.create({
         data: {
             productName,
             organization: { connect: { id: organizationId } },
             users: { connect: { id: userId } }  
         },
     });
 };