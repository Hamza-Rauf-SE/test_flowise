import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTodo } from "../context/TodoContext";
import { useRouter } from "next/router";

export default function Todos() {
    const [newTodo, setNewTodo] = useState("");
    const { user, isAuthenticated, logout } = useAuth();
    const { todos, addTodo, deleteTodo } = useTodo();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (newTodo.trim()) {
            await addTodo(newTodo.trim());
            setNewTodo("");
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}>
                <h1>Todo List</h1>
                <div>
                    <span style={{ marginRight: "10px" }}>Welcome, {user.email}</span>
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: "8px 16px",
                            background: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                        }}>
                        Logout
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={e => setNewTodo(e.target.value)}
                        placeholder="Add a new todo"
                        style={{ flex: 1, padding: "8px" }}
                        required
                    />
                    <button
                        type="submit"
                        style={{
                            padding: "8px 16px",
                            background: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                        }}>
                        Add Todo
                    </button>
                </div>
            </form>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px",
                            marginBottom: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}>
                        <span>{todo.title}</span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            style={{
                                padding: "4px 8px",
                                background: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                            }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
