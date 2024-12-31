// controllers/userController.js
const userService = require('../services/userService');

exports.getUserDetails = async (req, res) => {
    const userId = req.session.userId||req.session.user.id;  // Assuming userId is stored in the session

    if (!userId) {
        return res.status(400).json({ message: 'User not authenticated' });
    }

    try {
        const userDetails = await userService.getUserDetails(userId);

        if (!userDetails) {
            return res.status(404).json({ message: 'User details not found' });
        }

        res.status(200).json({ message: 'User details retrieved successfully', data: userDetails });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};