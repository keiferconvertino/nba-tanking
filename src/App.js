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
          <h1>NBA TANK RANKINGS</h1>
        </header>
        <div className="subheader">
          <div className = 'page-links'>
            <Link className = 'App-link' to="/">HOME</Link>
            <Link className = 'App-link' to="/commanders">TANK COMMANDERS</Link>
          </div>
        </div>
        <Switch>
          <Route path="/commanders">
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
