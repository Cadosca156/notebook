import {useAuth} from "../context/AuthContext";
import '../styles/navbar.css';
import {useState} from "react";
import {NavLink} from "react-router-dom";
import WeatherMap from "./WeatherMap";

export default function Navbar() {
    const {user, logout} = useAuth();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div   onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               className={`navbar ${isHovered ? "active" : ""}`}>

            <h1
                className={`welcome ${isHovered ? "active" : ""}`}>Welcome, {user.username}!</h1>
                <div className="link-container">

                <NavLink to="./weather"  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }>
                    <button className={"link-button"} >
                    Weather
                </button></NavLink>



                <NavLink to="/" className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }><button className={"link-button"}>
                    Notes
                    </button> </NavLink>

                </div>
            <button onClick={logout} className={`logout-button ${isHovered ? "active" : ""}`}>
                <span className={
                    `logout-text ${isHovered ? "active" : ""}`
                }>Logout</span>
            </button>


        </div>
    )
}