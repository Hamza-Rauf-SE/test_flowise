import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TodoContext = createContext();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function TodoProvider({ children }) {
    const [todos, setTodos] = useState([]);
    const { token, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated && token) {
            fetchTodos();
        } else {
            setTodos([]);
        }
    }, [isAuthenticated, token]);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/todos`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch todos");
            }

            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const addTodo = async text => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: text }),
            });

            if (!response.ok) {
                throw new Error("Failed to add todo");
            }

            const newTodo = await response.json();
            setTodos([...todos, newTodo]);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const deleteTodo = async id => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete todo");
            }

            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>{children}</TodoContext.Provider>;
}

export function useTodo() {
    return useContext(TodoContext);
}
