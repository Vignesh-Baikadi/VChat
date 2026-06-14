const User = require("../models/User");
const Message = require("../models/Message");


const getUsers = async (req, res) => {
  try {
    // Exclude the currently logged-in user
    const users = await User.find({
      _id: { $ne: req.user._id },
    }).select("-password");

    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {

    // Find newest message between current user and sidebar user
    const lastMessage = await Message.findOne({$or: [
            {
              sender: req.user._id,
              receiver: user._id,
            },
            {
              sender: user._id,
              receiver: req.user._id,
            },
          ],
        }).sort({ createdAt: -1 });

        return {
          ...user.toObject(),
          lastMessage: lastMessage?.content || "No messages yet",
          lastMessageTime: lastMessage?.createdAt || null,
        };
      })
    );

    res.status(200).json({
      success: true,
      users: usersWithLastMessage,
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