
const projectService = require('../services/projectService');

exports.createProject = async (req, res) => {
    const { projectName } = req.body;
    const userId = req.session.userId;
    const organizationId = req.session.organizationId;
    const productId = req.session.productId;

    if (!userId || !organizationId || !productId) {
        return res.status(400).json({ message: 'User, organization, or product not found in session' });
    }
    
    try {
        const project = await projectService.createProject(productId, organizationId, userId, projectName);
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
      // Retrieve the user ID from the session
      const userId = req.session.user.id;
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized. No user in session." });
      }
  
      // Fetch the user's projects
     const projects = await projectService.getProjects(userId);
  
      res.status(200).json({ message: "Projects retrieved successfully", projects });
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  