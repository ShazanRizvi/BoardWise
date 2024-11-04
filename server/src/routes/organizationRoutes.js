const express = require('express');
const organizationController = require('../controllers/organizationController');

const router = express.Router();

// GET /api/organizations/:id
router.get('/:id', organizationController.getOrganizationById);
router.post('/createorg', organizationController.createOrganization);

module.exports = router;