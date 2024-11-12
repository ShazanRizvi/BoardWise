const authService = require('../services/authService');

exports.signUp = async (req, res) => {
     const { username, emailAddress, password } = req.body;
 
     try {
        const { user, token } = await authService.signUp(username, emailAddress, password);

        // Check if `user` contains an `id` before setting it in the session
        if (!user || !user.id) {
            console.error("User ID is missing in the returned user object:", user);
            return res.status(400).json({ message: 'User ID is missing' });
        }

        // Set userId in the session after successful signup
        req.session.userId = user.id;  // Use `user.id` from the nested `user` object
        console.log("User ID stored in session:", req.session.userId);
         res.status(201).json({ message: 'User created successfully', user,token });
     } catch (error) {
         res.status(400).json({ message: error.message });
     }
 };