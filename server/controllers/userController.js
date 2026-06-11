const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    // Exclude the currently logged-in user
    const users = await User.find({
      _id: { $ne: req.user._id },
    }).select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getUsers,
};