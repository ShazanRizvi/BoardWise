const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getById = async (id) => {
     return await prisma.organization.findUnique({
         where: {
             id: id,
         },
     });
 };

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
  