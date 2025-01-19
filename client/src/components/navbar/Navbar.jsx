import React from "react";
import Logo from "../../assets/img/navbar-logo.png"
import './styles/navbar.css'
import { NavLink } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { logout } from "../../reducers/userReducer";

const Navbar = () =>{
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return(
        <div className = "navbar">
            <img src={Logo} alt="" className="navbar__logo"/>
            <div className="navbar__header">FREE CLOUD</div>
            {!isAuth && <div className="navbar__login"><NavLink to="/login">Login</NavLink></div>}
            {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Register</NavLink></div>}
            {isAuth && <div className="navbar__login" onClick={() => dispatch(logout()) }>Log Out</div>}
        </div>
    )
}

//
export default Navbar;