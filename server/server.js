const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const cors = require("cors");

dotenv.config();
connectDB();
const app = express();
app.use(cors({origin: "http://localhost:5173",}));
app.use(express.json());

// All auth routes will start with /api/auth
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});