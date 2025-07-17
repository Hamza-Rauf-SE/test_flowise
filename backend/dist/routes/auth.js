const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware/auth");

const router = express.Router();

// In-memory user storage (replace with a database in production)
const users = [];

// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = {
            id: users.length + 1,
            email,
            password: hashedPassword,
        };

        users.push(user);

        // Create and assign token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create and assign token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

module.exports = router;
