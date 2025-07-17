import { AuthProvider } from "../context/AuthContext";
import { TodoProvider } from "../context/TodoContext";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <TodoProvider>
                <Component {...pageProps} />
            </TodoProvider>
        </AuthProvider>
    );
}

export default MyApp;
