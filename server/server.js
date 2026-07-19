const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http  = require("http");
const {Server} = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());


//For the socket io connection
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onlineUsers = {};

global.io = io;
global.onlineUsers = onlineUsers;


io.on("connection", (socket) => {
  
  // For Typing to showonly to the chat fir whom the user is typing to
  socket.on(
    "typing",
    ({ senderId, receiverId }) => {
      const receiverSocket = onlineUsers[receiverId];
      if (receiverSocket) {
        io.to(receiverSocket).emit(
          "typing",
          senderId
        );
      }
    }
  );


  //To stop typing
  socket.on(
    "stopTyping",
    ({ senderId, receiverId }) => {
      const receiverSocket =
        onlineUsers[receiverId];
      if (receiverSocket) {
        io.to(receiverSocket).emit(
          "stopTyping",
          senderId
        );
      }
    }
  );


  socket.on("userJoined", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("Online Users:", onlineUsers);
    io.emit("onlineUsers",Object.keys(onlineUsers));
  });

  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        io.emit("onlineUsers",Object.keys(onlineUsers));
        break;
      }
    }
    // console.log("Online Users:", onlineUsers);

  });
});

// All auth routes will start with /api/auth
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running...");
});

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});