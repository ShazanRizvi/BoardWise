const organizationService = require("../services/organizationService");

exports.createOrganization = async (req, res, next) => {
  const { userId, organizationName, orgLogo } = req.body;

    try {
        const organization = await organizationService.createOrganization(userId, organizationName, orgLogo);
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


