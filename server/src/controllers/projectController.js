
const projectService = require('../services/projectService');

exports.createProject = async (req, res) => {
    const { productId, projectName, userId, organizationId } = req.body;

    try {
        const project = await projectService.createProject(productId, projectName, userId, organizationId);
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};