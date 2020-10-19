import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useTable } from 'react-table'

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [currentGP, setCurrentGP] = useState(1);
  const [currentPTS, setCurrentPTS] = useState(0);

  const [lotteryTeams, setLotteryTeams] = useState([])
  const [playoffTeams, setPlayoffTeams] = useState([])
  useEffect(() => {
    fetch('/test').then(res => res.json()).then(data => {
      console.log(data[0])
      let player = data[0]
      setCurrentPlayer(player.PLAYER_NAME)
      setCurrentGP(player.GP)
      setCurrentPTS(player.PTS)
    });
  }, [])

  useEffect(() => {
    fetch('/playoff_teams').then(res => res.json()).then(data => {
      console.log(data)
      setPlayoffTeams(data)
    });
  }, [])

  useEffect(() => {
    fetch('/lottery_teams').then(res => res.json()).then(data => {
      console.log(data)
      setLotteryTeams(data)
    });
  }, [])

  function simulateLottery() {
    fetch('/simulate').then(res => res.json()).then(data => {
      console.log(data)
      setLotteryTeams(data)
    });
  }

  function reset() {
    fetch('/lottery_teams').then(res => res.json()).then(data => {
      console.log(data)
      setLotteryTeams(data)
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <button className="simulate" onClick={simulateLottery}>Simulate</button>
          <button className="button" onClick={reset}>Reset</button>
        </div>
        
        <tbody>
          {lotteryTeams.map(team => <tr key={team.TeamCity}>
            <td className='city'>{team.TeamCity}</td>
            <td className='win-pct'>{team.WinPCT}</td>
            <td className='record'>{team.Record}</td>
          </tr>)}
          {playoffTeams.map(team => <tr key={team.TeamCity}>
            <td className='city'>{team.TeamCity}</td>
            <td className='win-pct'>{team.WinPCT}</td>
            <td className='record'>{team.Record}</td>
          </tr>)}

          
        </tbody>
        <p>{currentPlayer} averages {(currentPTS / currentGP).toFixed(2)} points per game.</p>
      </header>
    </div>
  );
}

export default App;
