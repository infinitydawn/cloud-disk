import React, { useEffect } from 'react';
import Navbar from "./navbar/Navbar";
import './styles/app.css'
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../actions/user.js"
import Disk from "../components/disk/Disk.jsx"

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])


  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className='wrap'>
          {!isAuth ?
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Redirect to="/login"/>
            </Switch>
            :
            <Switch>
              <Route exact path="/" component={Disk} />
              <Redirect to="/"/>
            </Switch>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
