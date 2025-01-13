import React, {useState} from 'react'
import "./styles/authorization.css"
import Input from "../../utils/input/input.jsx"
import { registration } from '../../actions/user.js'

const Registration = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className='authorization'>
            <div className="authorization__header">Registration</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Enter Your Email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Enter Your Password..."/>
            <button className="authorization_btn" onClick={() => registration(email,password)}>Sign Up</button>
        </div>
    )

}

export default Registration