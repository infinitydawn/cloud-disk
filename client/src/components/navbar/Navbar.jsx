import React from "react";
import Logo from "../../assets/img/navbar-logo.png"
import './styles/navbar.css'
import { NavLink } from "react-router-dom";

const Navbar = () =>{
    return(
        <div className = "navbar">
            <img src={Logo} alt="" className="navbar_logo"/>
            <div className="navbar__header">FREE CLOUD</div>
            <div className="navbar__login"><NavLink to="/login">Login</NavLink></div>
            <div className="navbar__registration"><NavLink to="/registration">Register</NavLink></div>
        </div>
    )
}


export default Navbar;