import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useTable } from 'react-table'

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [currentGP, setCurrentGP] = useState(1);
  const [currentPTS, setCurrentPTS] = useState(0);

  const [lotteryTeams, setLotteryTeams] = useState([])

  const [expectedLotteryTeams, setExpectedLotteryTeams] = useState([])

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
      setExpectedLotteryTeams(data)
    });
  }, [])
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>NBA TANK RANKINGS</h1>
      </header>
      <body className ="App-body">
        <div>
          <button className="simulate" onClick={simulateLottery}>Simulate</button>
          <button className="button" onClick={reset}>Reset</button>
        </div>
        <table className="draft-board">
          <tbody>
            <tr className="headers">
              <td>Draft Pos</td>
              <td>Team</td>
              <td>Win Percentage</td>
              <td>Record</td>
            </tr>
            {lotteryTeams.map((team,index) =>{
              var index = index+1;

              return <tr key={team.TeamCity}>
              <td className='order'> {index} </td>
              <td className='city'>{team.TeamCity}</td>
              <td className='win-pct'>{team.WinPCT}</td>
              <td className='record'>{team.Record}</td>
            </tr>})}
            <tr>
              <td className='lottery-break'colspan="4">LOTTERY ENDS HERE</td>
              
            </tr>
            {playoffTeams.map((team, index) => {
              var index = index+15;

              var row = <tr key={team.TeamCity}>
                <td className='order'>{index}</td>
                <td className='city'>{team.TeamCity}</td>
                <td className='win-pct'>{team.WinPCT}</td>
                <td className='record'>{team.Record}</td>
              </tr>
              return row

          
          })}

            
          </tbody>
        </table>
        <p>{currentPlayer} averages {(currentPTS / currentGP).toFixed(2)} points per game.</p>
      </body>
    </div>
  );
  
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
}

export default App;
