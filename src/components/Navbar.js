import {useAuth} from "../context/AuthContext";
import '../styles/navbar.css';
import {useState} from "react";
import {NavLink} from "react-router-dom";


export default function Navbar() {
    const {user, logout} = useAuth();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div   onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               className={`navbar ${isHovered ? "active" : ""}`}>

            <h1
                className={`welcome ${isHovered ? "active" : ""}`}>Notebook</h1>
                <div className="link-container">


                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }><button className={"link-button"}>
                        Notes
                    </button> </NavLink>

                <NavLink to="./weather"  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }>
                    <button className={"link-button"} >
                    Weather
                </button></NavLink>





                </div>
            <button onClick={logout} className={`logout-button ${isHovered ? "active" : ""}`}>
                <span className={
                    `logout-text ${isHovered ? "active" : ""}`
                }>Logout</span>
            </button>


        </div>
    )
}