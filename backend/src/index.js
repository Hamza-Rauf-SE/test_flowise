const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const { authenticateToken } = require("./middleware/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", authenticateToken, todoRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
