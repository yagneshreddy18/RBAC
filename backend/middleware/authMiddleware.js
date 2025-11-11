const jwt = require("jsonwebtoken");
const SECRET = "mysecretkey"; // same as in authRoutes.js

// Verify JWT token
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied, token missing" });

    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // attach id and role from JWT
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Check if user has allowed role(s)
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied, insufficient permissions" });
    }
    next();
  };
};
