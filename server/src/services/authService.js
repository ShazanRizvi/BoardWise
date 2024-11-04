const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

exports.signUp = async (username, emailAddress, password, loginType) => {
     const hashedPassword = await bcrypt.hash(password, 10);
 
     return await prisma.user.create({
         data: {
             username,
             emailAddress,
             password: hashedPassword,
         },
     });
 };