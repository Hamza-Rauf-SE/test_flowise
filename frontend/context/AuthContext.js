import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check for token in localStorage on mount
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            // Extract email from token (you might want to decode the JWT properly in production)
            try {
                const email = JSON.parse(atob(storedToken.split(".")[1])).email;
                setUser({ email });
            } catch (error) {
                console.error("Error parsing token:", error);
                localStorage.removeItem("token");
                setToken(null);
                setIsAuthenticated(false);
            }
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.message || "Login failed" };
            }

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser({ email });
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            // Check if it's a network error
            if (!window.navigator.onLine) {
                return { success: false, error: "No internet connection. Please check your network." };
            }
            return { success: false, error: "Cannot connect to the server. Please try again later." };
        }
    };

    const signup = async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.message || "Signup failed" };
            }

            localStorage.setItem("token", data.token);
            setToken(data.token);
            setUser({ email });
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            // Check if it's a network error
            if (!window.navigator.onLine) {
                return { success: false, error: "No internet connection. Please check your network." };
            }
            return { success: false, error: "Cannot connect to the server. Please try again later." };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
