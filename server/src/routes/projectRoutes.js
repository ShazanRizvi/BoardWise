const express = require('express');
const projectController = require('../controllers/projectController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/create_project',authenticate, projectController.createProject);
router.get('/projects',authenticate, projectController.getProjects);

module.exports = router;