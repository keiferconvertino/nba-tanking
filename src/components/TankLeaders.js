import React, { useState, useEffect } from 'react';

function TankLeaders() {
    const [currentTankLeaders, setTankLeaders] = useState([]);

    useEffect(() => {
        fetch('/tank_leaders').then(res => res.json()).then(data => {
          console.log(data)
          setTankLeaders(data)
        });
      }, [])

    return (
      <body className ="App-body">
          {currentTankLeaders.map((player) => {
            return (
              <div>
                <h3>{player.PLAYER_NAME}</h3>
              </div>
            )
          })}
      </body>
    )
}

export default TankLeaders;