const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createProject = async (productId, projectName, userId, organizationId) => {
     return await prisma.project.create({
         data: {
             projectName,
             user: { connect: { id: userId } },
             organization: { connect: { id: organizationId } },
             products: { connect: { id: productId } },
         },
     });
 };