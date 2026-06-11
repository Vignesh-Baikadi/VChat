const express = require("express");
const { getUsers } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Only logged-in users can fetch users
router.get("/", protect, getUsers);

module.exports = router;