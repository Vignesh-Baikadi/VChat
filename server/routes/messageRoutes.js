const express = require("express");
const {sendMessage,getMessages} = require("../controllers/messageController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Save a new message
router.post("/", protect, sendMessage);
// Gets messages for the user 
router.get("/:userId",protect,getMessages);

module.exports = router;