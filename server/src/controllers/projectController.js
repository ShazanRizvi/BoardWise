const projectService = require("../services/projectService");

exports.createProject = async (req, res) => {
  const { projectName, description } = req.body;
  const userId = req.session.user.id;
  const organizationId = req.session.organizationId;
  const productIdFromSession = req.session.productId;
  const productIdFromParams = req.params?.productId;

  const productId = productIdFromParams || productIdFromSession;

  if (!userId || !organizationId || !productId) {
    return res
      .status(400)
      .json({ message: "User, organization, or product not found in session" });
  }

  try {
    console.log("User ID:", userId);
    console.log("Organization ID:", organizationId);
    console.log("Product ID Used:", productId);
    const project = await projectService.createProject(
      productId,
      organizationId,
      userId,
      projectName,
      description
    );
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    // Retrieve the user ID from the session
    const userId = req.session.user.id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No user in session." });
    }

    // Fetch the user's projects
    const projects = await projectService.getProjects(userId);

    res
      .status(200)
      .json({ message: "Projects retrieved successfully", projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProjectByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    // Validate the input
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Fetch projects related to the product
    const projects = await projectService.getProjectsByProduct(productId);

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ message: "No projects found for this product" });
    }

    res.status(200).json({
      message: "Projects retrieved successfully",
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addUserToProject = async (req, res) => {
  const { userId, projectId, accessLevel } = req.body;
  const adminId = req.session.user.id; // Admin ID from the session

  try {
    // Ensure the user making the request is an Admin
    const adminRoles = await prisma.projectAccess.findFirst({
      where: { userId: adminId, projectId, accessLevel: 'Admin' },
    });

    if (!adminRoles) {
      return res.status(403).json({ message: 'Only admins can add users to projects.' });
    }

    // Add the user to the project
    const projectAccess = await projectService.addUserToProject(userId, projectId, accessLevel);

    res.status(201).json({ message: 'User added to project successfully', projectAccess });
  } catch (error) {
    console.error('Error adding user to project:', error.message);
    res.status(500).json({ message: 'Error adding user to project' });
  }
};
