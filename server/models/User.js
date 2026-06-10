// Import mongoose to create schemas and interact with MongoDB
const mongoose = require("mongoose");

// Define the structure of a User document
const userSchema = new mongoose.Schema(
  {
    // User's display name
    username: {
      type: String,
      required: true,
      trim: true,
    },

    // User's email address
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    // User's password (later this will be hashed using bcrypt)
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Create User model from schema
const User = mongoose.model("User", userSchema);

// Export model so other files can use it
module.exports = User;