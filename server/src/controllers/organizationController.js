const organizationService = require("../services/organizationService");

exports.createOrganization = async (req, res) => {
  const { organizationName, orgLogo } = req.body;
  const userId = req.session.user.id; // Retrieve userId from session
  console.log('userId', userId);

  if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
  }

  try {
      const organization = await organizationService.createOrganization(userId, organizationName, orgLogo);
      req.session.organizationId = organization.id; // Store organizationId in session
      res.status(201).json({ message: 'Organization created successfully', organization });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};


exports.getOrganization = async (req, res) => {
  try {
    // Retrieve the user ID from the session
    const userId = req.session.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. No user in session." });
    }

    // Fetch the user's organization
    const organization = await organizationService.getOrganization(userId);

    if (!organization) {
      return res.status(404).json({ message: "No organization found for the user." });
    }

    res.status(200).json({ message: "Organization retrieved successfully", organization });
  } catch (error) {
    console.error("Error fetching organization:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsersByOrganization = async (req, res) => {
  const organizationId = req.session.organizationId;
  

  if (!organizationId) {
    return res.status(400).json({ message: "Organization not found in session" });
  }

  try {
    const users = await organizationService.getUsersByOrganization(organizationId);
    

    res.status(200).json({ users: users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Error fetching users" });
  }
};



