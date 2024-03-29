import React, { useState, useEffect } from 'react';
import TeamList from './TeamList.js'
import LeagueTankLeaders from './LeagueTankLeaders.js'

function TankLeaders(props) {
    const [currentTankLeaders, setTankLeaders] = useState([]);
    const [currentTeam, setCurrentTeam] = useState('All Teams');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetch(`/api/tank_leaders?team=${currentTeam}`).then(res => res.json()).then(data => {
          setTankLeaders(data);
          setLoading(false)
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
        {!loading && (
          <footer>* TR = TankRating (A metric measuring bad a player's total plus/minus 
          is compared to the average plus/minus of their teammates)</footer>
        )}
        
      </div>
    )
}

export default TankLeaders;