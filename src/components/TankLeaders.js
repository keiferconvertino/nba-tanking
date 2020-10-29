import React, { useState, useEffect } from 'react';
import TeamList from './TeamList.js'

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
                <div className = 'player-image'>
                  <img className = 'player-headshot' src = {'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' + player.PLAYER_ID +'.png'}></img>
                </div>
                <div className = 'player-name'>
                  {player.PLAYER_NAME}
                </div>
                <div className = 'player-plus-minus'>
                 {Math.abs(player.TANK_RANK)} TR
                </div>
              </div>
            )
          })}
        </div>
      </body>
    )
}

export default TankLeaders;