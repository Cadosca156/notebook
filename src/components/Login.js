import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css"

export default function Login() {
    const [username, setUsername] = useState("");
    const { login } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
        if (!username.trim()) {
            alert("Enter username");
            return;
        }
        login(username);
    }

    return (
        <div className="background-login">
            <div className="header-container">
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <button className={"login-button"} type="submit">Login</button>
        </form>
            </div>
        </div>
    );
}