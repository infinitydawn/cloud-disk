import React from 'react';
import Navbar from "./navbar/Navbar";
import './styles/app.css'
import Registration from "./registration/Registration";
import { BrowserRouter, Switch, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className='wrap'>
          <Switch>
            <Route path="/registration" component={Registration} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
