const express = require('express');
const organizationController = require('../controllers/organizationController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// GET /api/organizations/:id
router.get('/:id', authenticate,organizationController.getOrganizationById);
router.post('/createorg',authenticate, organizationController.createOrganization);

module.exports = router;