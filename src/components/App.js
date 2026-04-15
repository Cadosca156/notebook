import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./Notes";
import Navbar from "./Navbar";
import WeatherMap from "./WeatherMap";
import "../styles/background.css"
import Login from "./Login";
import { useAuth } from "../context/AuthContext";


export default function App() {
    const {user, logout} = useAuth();
    if (!user) return <Login/>;
    return (
        <div className="background">
        <BrowserRouter>
            <Navbar />

            <Routes>

                <Route path="/" element={<Notes />} />
                <Route path="/weather" element={<WeatherMap />} />

            </Routes>

        </BrowserRouter>
        </div>
    );
}