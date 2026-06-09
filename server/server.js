const express = require("express");

const app = express();

app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/api/auth/register", (req, res) => {
  console.log(req.body);

  res.json({
    success: true,
    message: "User registered successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});