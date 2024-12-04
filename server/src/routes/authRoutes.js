const express = require('express');
const authController = require('../controllers/authController');
const authorizeRole = require('../middlewares/RBAMiddleware');

const router = express.Router();
router.post("/invite", authorizeRole(["Admin"]), authController.createInvite);
router.post("/activate", authController.activateAccount); 
router.post("/login", authController.login);
router.post('/signup', authController.signUp);

module.exports = router;