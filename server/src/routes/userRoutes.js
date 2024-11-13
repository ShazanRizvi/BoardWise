const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Route to get user details including organization, products, and projects
router.get('/details', userController.getUserDetails);

module.exports = router;