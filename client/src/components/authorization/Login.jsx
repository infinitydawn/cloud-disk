import React, {useState} from 'react'
import "./styles/authorization.css"
import Input from "../../utils/input/input.jsx"
import {useDispatch} from "react-redux"
import {login} from "../../actions/user.js"


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()


    return (
        <div className='authorization'>
            <div className="authorization__header">Login</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter Your Email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter Your Password..."/>
            <button className="authorization_btn" onClick={()=>dispatch(login(email,password))}>Log In</button>
        </div>
    )

}

export default Login