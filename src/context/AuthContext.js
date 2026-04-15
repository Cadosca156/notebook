import { createContext, useContext, useState } from "react";

const COOKIE_NAME = "user";

function saveUser(user) {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
        JSON.stringify(user)
    )}; path=/; max-age=31536000`;
}

function loadUser() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === COOKIE_NAME) {
            try {
                return JSON.parse(decodeURIComponent(value));
            } catch {
                return null;
            }
        }
    }
    return null;
}

function clearUser() {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => loadUser());

    function login(username) {
        if (!username.trim()) return;
        const userObj = { username, id: Date.now() };
        setUser(userObj);
        saveUser(userObj);
    }

    function logout() {
        setUser(null);
        clearUser();
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
