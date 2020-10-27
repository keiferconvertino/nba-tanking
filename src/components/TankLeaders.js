import React, { useState, useEffect } from 'react';
import TeamList from './TeamList.js'
import '../App.css'
function TankLeaders(props) {
    const [currentTankLeaders, setTankLeaders] = useState([]);
    const [currentTeam, setCurrentTeam] = useState('');

    useEffect(() => {
        fetch(`/api/tank_leaders?team=${currentTeam}`).then(res => res.json()).then(data => {
          console.log(data)
          setTankLeaders(data)
        });
      }, [currentTeam])


    const handleChange = (event) => {
      console.log(currentTeam)
      setCurrentTeam(event.target.value)
      }

    return (
      <body className ="App-body">
        <TeamList team = {currentTeam} changeHandler = {handleChange}></TeamList>
        <div>
          {currentTankLeaders.map((player) => {
            return (
              <div>{player.PLAYER_NAME}</div>
            )
          })}
        </div>
      </body>
    )
}

export default TankLeaders;