const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();
router.post('/create_project', projectController.createProject);

module.exports = router;