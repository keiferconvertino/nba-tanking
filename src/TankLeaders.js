import React, { useState, useEffect } from 'react';

function TankLeaders() {
    const [currentTankLeaders, setTankLeaders] = useState("");

    useEffect(() => {
        fetch('/tank_leaders').then(res => res.json()).then(data => {
          console.log(data)
          setTankLeaders(data)
        });
      }, [])

    return <h1></h1>
}

export default TankLeaders;