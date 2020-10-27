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
        <div className = 'commanders'>
          {currentTankLeaders.map((player) => {
            return (
              <div className = 'player-name-and-image'>
                <img className = 'player-headshot' src = {'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/' + player.PLAYER_ID +'.png'}></img>
                {player.PLAYER_NAME}
              </div>
            )
          })}
        </div>
      </body>
    )
}

export default TankLeaders;