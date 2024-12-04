const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

exports.createInvite = async (emailAddress, organizationId) => {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { emailAddress } });
    if (existingUser) {
      throw new Error("User already exists");
    }
  
    // Generate a unique invite token
    const token = crypto.randomBytes(32).toString("hex");
  
    // Create the invite token
    const invite = await prisma.inviteToken.create({
      data: {
        token,
        emailAddress,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
        organizationId,
      },
    });
  
    return `${process.env.BOARDWISE_FRONTEND_HOST}/invite/${token}`;
  };

  // Service to activate an account
exports.activateAccount = async (token, username, password) => {
    // Find the invite token
    const invite = await prisma.inviteToken.findUnique({ where: { token } });
    if (!invite || invite.isUsed || new Date() > invite.expiresAt) {
      throw new Error("Invalid or expired invite token");
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the user account
    const user = await prisma.user.create({
      data: {
        username,
        emailAddress: invite.emailAddress,
        password: hashedPassword,
        organizationId: invite.organizationId,
        roles: { connect: { name: "team_member" } }, // Attach team member role
      },
    });
  
    // Mark the invite as used
    await prisma.inviteToken.update({
      where: { id: invite.id },
      data: { isUsed: true },
    });
  
    return user;
  };


// Service to log in a user
exports.login = async (emailAddress, password) => {
    // Fetch the user
    const user = await prisma.user.findUnique({
      where: { emailAddress },
      include: { userRole: true },
    });
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }
  
    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
  
    // Ensure the user has valid roles
    const roles = user.userRole.map((role) => role.name);
    console.log(roles);
    if (!roles.includes("Admin") && !roles.includes("team_member")) {
      throw new Error("Unauthorized role");
    }
  
    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.emailAddress,
        roles,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  
    return { token, user };
  };  



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
    where: { name: "Admin" },
  });

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: "Admin",
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
      roles: userWithRole.userRole.map((role) => role.name), // Include roles in token
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expiration time, e.g., 1 hour
  );

  // Step 7: Return user with role and token
  return {
    user: userWithRole,
    token,
  };
};
