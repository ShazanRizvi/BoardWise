const organizationService = require("../services/organizationService");

exports.createOrganization = async (req, res) => {
  const { organizationName, orgLogo } = req.body;
  const userId = req.session.userId; // Retrieve userId from session
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

exports.getOrganizationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const organization = await organizationService.getById(id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(organization);
  } catch (error) {
    next(error);
  }
};


