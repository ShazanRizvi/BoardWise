const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

exports.createInvite = async (
  emailAddress,
  userRole,
  userOrgPosition,
  organizationId,
  adminId
) => {
  const admin = await prisma.user.findUnique({
    where: { id: adminId },
    include: { userRole: true },
  });
  console.log("org ID", organizationId);
  console.log("admin", adminId);

  const isAdmin = admin?.userRole.some((role) => role.name === "Admin");
  if (!isAdmin) {
    throw new Error("Only Admins can invite users to the organization");
  }
  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { emailAddress },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Generate a unique invite token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Create the invite token
  const invite = await prisma.inviteToken.create({
    data: {
      token,
      emailAddress,
      expiresAt, // 24 hours expiration
      userRole,
      organization: { connect: { id: organizationId } },
      userOrgPosition, // Include userOrgPosition
    },
  });

  console.log("invite from createInvite", invite);

  return { token, expiresAt };
};

// Service to activate an account
exports.activateAccount = async (token, username, password) => {
  // Find the invite token
  const invite = await prisma.inviteToken.findUnique({
    where: { token },
    include: { organization: true },
  });
  if (!invite || invite.isUsed || invite.expiresAt < new Date()) {
    throw new Error("Invalid or expired invite token");
  }
  console.log("invite", invite);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user account
  const user = await prisma.user.create({
    data: {
      username,
      emailAddress: invite.emailAddress,
      password: hashedPassword,
      userOrgPosition: invite.userOrgPosition,
      organization: { connect: { id: invite.organizationId } },
      userRole: {
        connect: { name: invite.userRole }, // Assign role (e.g., Admin or Team Member)
      },
    },
  });

  // Mark the invite as used
  await prisma.inviteToken.update({
    where: { token },
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
  const userRoles = user.userRole.map((role) => role.name);
  console.log(userRoles);
  if (!userRoles.includes("Admin") && !userRoles.includes("TeamMember")) {
    throw new Error("Unauthorized role");
  }

  const tokenPayload = {
    userId: user.id,
    email: user.emailAddress,
    roles: userRoles,
  };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Return the token and user details
  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      emailAddress: user.emailAddress,
      organization: user.organizationId,
      roles: userRoles,
    },
  };
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
