const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signUp = async (username, emailAddress, password) => {

     const hashedPassword = await bcrypt.hash(password, 10);
     
     const user = await prisma.user.create({
         data: {
             username,
             emailAddress,
             password: hashedPassword,
         },
     });


    let adminRole = await prisma.role.findUnique({
        where: { name: 'Admin' },
    });

  
    if (!adminRole) {
        adminRole = await prisma.role.create({
            data: {
                name: 'Admin',
            },
        });
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            userRole: {
                connect: { id: adminRole.id },
            },
        },
    });

    const userWithRole = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
            id: true,
            username: true,
            emailAddress: true,
            userRole: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

     const token = jwt.sign(
        {
            userId: user.id,
            email: user.emailAddress,
            roles: userWithRole.userRole.map(role => role.name), // Include roles in token
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Token expiration time, e.g., 1 hour
    );

    // Step 7: Return user with role and token
    return {
        user: userWithRole,
        token,
    };
 };