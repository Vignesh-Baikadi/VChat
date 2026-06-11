const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) 
    { 
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Store decoded user data in request object
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = protect;