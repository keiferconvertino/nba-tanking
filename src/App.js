import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import TankTeams from './components/TankTeams';
import TankLeaders from './components/TankLeaders'


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        
        <header className="App-header">
          <div >
            <Link className = 'App-link' to="/">Home</Link>
            &nbsp;|&nbsp;
            <Link className = 'App-link' to="/leaders">Tank Leaders</Link>
          </div>
          <h1>NBA TANK RANKINGS</h1>
        </header>
        <Switch>
          <Route path="/leaders">
            <TankLeaders></TankLeaders>
          </Route>
          <Route path = "/"> 
            <TankTeams></TankTeams>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );


}

export default App;
