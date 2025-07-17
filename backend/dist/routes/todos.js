const express = require("express");
const router = express.Router();

// In-memory todo storage (replace with a database in production)
const todos = [];

// Get all todos for a user
router.get("/", (req, res) => {
    const userTodos = todos.filter(todo => todo.userId === req.user.id);
    res.json(userTodos);
});

// Create a new todo
router.post("/", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    const todo = {
        id: todos.length + 1,
        userId: req.user.id,
        title,
        completed: false,
        createdAt: new Date(),
    };

    todos.push(todo);
    res.status(201).json(todo);
});

// Delete a todo
router.delete("/:id", (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === todoId && todo.userId === req.user.id);

    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    todos.splice(todoIndex, 1);
    res.json({ message: "Todo deleted successfully" });
});

module.exports = router;
