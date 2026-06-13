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

app.use(cors({origin: "http://localhost:5173",}));
app.use(express.json());


//For the socket io connection
const io = new Server(server,{cors : 
  {origin : "http://localhost:5173",methods : ["GET" , "POST"],},
});


const onlineUsers = {};

global.io = io;
global.onlineUsers = onlineUsers;

io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);
  socket.on("userJoined", (userId) => {
    onlineUsers[userId] = socket.id;
    console.log("Online Users:", onlineUsers);

  });

  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
    console.log("Online Users:", onlineUsers);

  });
});

// All auth routes will start with /api/auth
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server is running...");
});

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});