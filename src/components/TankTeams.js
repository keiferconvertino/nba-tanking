import React, { useState, useEffect } from 'react';
import '../App.css';
import TankTable from './TankTable';
import Button from '@material-ui/core/Button';

function TankTeams() {


    const [currentPlayer, setCurrentPlayer] = useState("");
    const [currentGP, setCurrentGP] = useState(1);
    const [currentPTS, setCurrentPTS] = useState(0);

    const [lotteryTeams, setLotteryTeams] = useState([])
    const [expectedLotteryTeams, setExpectedLotteryTeams] = useState([]);

    useEffect(() => {
        fetch('/api/test').then(res => res.json()).then(data => {
        console.log(data[0])
        let player = data[0]
        setCurrentPlayer(player.PLAYER_NAME)
        setCurrentGP(player.GP)
        setCurrentPTS(player.PTS)
        });
    }, [])

        
    useEffect(() => {
        fetch('/api/lottery_teams').then(res => res.json()).then(data => {
        console.log(data)
        setLotteryTeams(data)
        setExpectedLotteryTeams(data)
        
        });
    }, [])

    return (
        <body className ="App-body">
            <div>
                <Button variant="contained" className="button" onClick = {simulateLottery}>Simulate</Button>
                <Button variant="contained" className="button" onClick = {reset}>Reset</Button>
            </div>
            <TankTable lotteryT = {lotteryTeams} expectedLotteryT = {expectedLotteryTeams}/>
            <p>{currentPlayer} averages {(currentPTS / currentGP).toFixed(2)} points per game.</p>
        </body>
    )

    function simulateLottery() {
        fetch('/api/simulate').then(res => res.json()).then(data => {
          console.log(data)
          setLotteryTeams(data)
        });
      }
    
      function reset() {
        setLotteryTeams(expectedLotteryTeams)
      }
      
}

export default TankTeams;