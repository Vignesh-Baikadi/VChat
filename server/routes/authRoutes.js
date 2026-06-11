const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Import controller function
const { registerUser,loginUser,getProfile } = require("../controllers/authController");

// Register route
// POST /api/auth/register
router.post("/register", registerUser);
// POST /api/auth/login
router.post("/login", loginUser);
// GET /api/auth/profile
router.get("/profile", protect, getProfile);


// Export router
module.exports = router;