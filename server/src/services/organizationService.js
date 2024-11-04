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
    const organization = await prisma.organization.create({
        data: {
            organizationName,
            orgLogo,
            users: { connect: { id: userId } },
        },
    });

    // Update user to link them with the created organization
    await prisma.user.update({
        where: { id: userId },
        data: { organizationId: organization.id },
    });

    return organization;
 };