const jwt = require("jsonwebtoken");

const authorizeRole = (requiredRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the user has at least one of the required roles
      const hasRole = decoded.roles.some((role) => requiredRoles.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: "Forbidden: Insufficient privileges" });
      }

      req.user = decoded; // Attach user info to the request
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authorizeRole;