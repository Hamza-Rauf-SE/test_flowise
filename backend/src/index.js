require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const { authenticateToken } = require("./middleware/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Server is up and running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", authenticateToken, todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
