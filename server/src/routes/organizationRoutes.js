const express = require('express');
const organizationController = require('../controllers/organizationController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /api/organizations/:id
router.post('/createorg',authenticate, organizationController.createOrganization);
router.get('/organization',authenticate, organizationController.getOrganization);

module.exports = router;