import React from "react";
import Logo from "../../assets/img/navbar-logo.png"

const Navbar = () =>{
    return(
        <div className = "navbar">
            <img src={Logo} alt="" className="navbar_logo"/>
            <div className="navbar_header">FREE CLOUD</div>
            <div className="navbar_login">Login</div>
            <div className="navbar_registration">Register</div>
        </div>
    )
}


export default Navbar;