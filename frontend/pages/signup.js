import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signup } = useAuth();
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        setError(""); // Clear any previous errors
        const result = await signup(email, password);

        if (result.success) {
            router.push("/todos");
        } else {
            setError(result.error);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px" }}>
            <h1>Sign Up</h1>
            {error && (
                <div
                    style={{
                        padding: "10px",
                        marginBottom: "15px",
                        backgroundColor: "#ffebee",
                        color: "#c62828",
                        borderRadius: "4px",
                    }}>
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ display: "block", width: "100%", padding: "8px" }}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ display: "block", width: "100%", padding: "8px" }}
                            required
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    style={{
                        padding: "8px 16px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                    }}>
                    Sign Up
                </button>
            </form>
            <p>
                Already have an account? <Link href="/login">Login</Link>
            </p>
        </div>
    );
}
