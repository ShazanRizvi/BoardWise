
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