const authService = require("../services/authService");

exports.createInvite = async (req, res) => {
  const { emailAddress } = req.body;
  const organizationId = req.session.organizationId;

  try {
    const inviteLink = await authService.createInvite(
      emailAddress,
      organizationId
    );
    res
      .status(201)
      .json({ message: "Invite created successfully", inviteLink });
  } catch (error) {
    console.error("Error creating invite:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  const { token, username, password } = req.body;

  try {
    const user = await authService.activateAccount(token, username, password);
    res.status(201).json({ message: "Account activated successfully", user });
  } catch (error) {
    console.error("Error activating account:", error.message);
    res.status(400).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const { token, user } = await authService.login(emailAddress, password);
    const organizationId = user.organizationId;

    req.session.organizationId = organizationId;
    req.session.user=user;

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.signUp = async (req, res) => {
  const { username, emailAddress, password } = req.body;

  try {
    const { user, token } = await authService.signUp(
      username,
      emailAddress,
      password
    );

    // Check if `user` contains an `id` before setting it in the session
    if (!user || !user.id) {
      console.error("User ID is missing in the returned user object:", user);
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Set userId in the session after successful signup
    req.session.userId = user.id; // Use `user.id` from the nested `user` object
    console.log("User ID stored in session:", req.session.userId);
    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
