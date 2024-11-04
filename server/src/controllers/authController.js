const authService = require('../services/authService');

exports.signUp = async (req, res) => {
     const { username, emailAddress, password } = req.body;
 
     try {
         const user = await authService.signUp(username, emailAddress, password);
         res.status(201).json({ message: 'User created successfully', user });
     } catch (error) {
         res.status(400).json({ message: error.message });
     }
 };