import React, { useState, useEffect } from 'react';
import TeamList from './TeamList.js'
import LeagueTankLeaders from './LeagueTankLeaders.js'

function TankLeaders(props) {
    const [currentTankLeaders, setTankLeaders] = useState([]);
    const [currentTeam, setCurrentTeam] = useState('');
    useEffect(() => {
        fetch(`/api/tank_leaders?team=${currentTeam}`).then(res => res.json()).then(data => {
          setTankLeaders(data)
        });
      }, [currentTeam])


    const handleChange = (event) => {
      setCurrentTeam(event.target.value)
      }
    
    let platoon = <LeagueTankLeaders leaders={currentTankLeaders}></LeagueTankLeaders>
    // Currently unused, could in the future!
    // if (currentTeam == ''){
    //   platoon = <LeagueTankLeaders leaders={currentTankLeaders}></LeagueTankLeaders>
    // }
    // else {
    //   platoon = <LeagueTankLeaders leaders={currentTankLeaders} team = {currentTeam}></LeagueTankLeaders>
    // }
    
    return (
      <div>
        <body className ="App-body">
          <TeamList team = {currentTeam} changeHandler = {handleChange}></TeamList>
          {platoon}
        </body>
        <footer>* TR = TankRating (A metric measuring bad a player's plus/minus 
          is compared to the average plus/minus of their teammates)</footer>
      </div>
    )
}

export default TankLeaders;