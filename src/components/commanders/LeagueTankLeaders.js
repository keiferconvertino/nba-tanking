import React, { useState, useEffect } from 'react';

function LeagueTankLeaders(props) {
    let commander = props.leaders[0]
    let corporals = [props.leaders[1], props.leaders[2]]
    let privates = [props.leaders[3], props.leaders[4], props.leaders[5]]

    console.log(commander)
    console.log('yo')

    if (typeof(commander) === "undefined") {
        return(<h1></h1>);
    }
    return(
    <div className = 'tank-platoon'>
 
        <div className = 'commander'>
        <div style={{padding:'20px', fontWeight:'bold'}}>TANK COMMANDER</div>
            <div className = 'player-image'>
                <img className = 'player-headshot-commander' src = {'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' + commander.PLAYER_ID +'.png'}></img>
            </div>
            <div className = 'player-name'>
                {commander.PLAYER_NAME}
            </div>
            <div className = 'player-plus-minus'>
                {-commander.TANK_RANK} TR
            </div>
        </div>      
        <div className = 'corporals'>
            <div style={{padding:'20px', fontWeight:'bold'}}>TANK CORPORALS</div>
          {corporals.map((player) => {
            return (
              <div className = 'corporal'>
                <div className = 'player-image'>
                  <img className = 'player-headshot-corporal' src = {'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' + player.PLAYER_ID +'.png'}></img>
                </div>

                <div className = 'player-name'>
                    {player.PLAYER_NAME}
                </div>
                <div className = 'player-plus-minus'>
                    {-player.TANK_RANK} TR
                </div>

              </div>
            )
          })}
        </div>
        <div className = 'privates'>
        <div style={{padding:'20px', fontWeight:'bold'}}>TANK PRIVATES</div>
          {privates.map((player) => {
            return (
              <div className = 'private'>
                <div className = 'player-image'>
                  <img className = 'player-headshot-private' src = {'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' + player.PLAYER_ID +'.png'}></img>
                </div>

                <div className = 'player-name'>
                    {player.PLAYER_NAME}
                </div>
                <div className = 'player-plus-minus'>
                    {-player.TANK_RANK} TR
                </div>
              </div>
            )
          })}
        </div>
    </div>
    )
}

export default LeagueTankLeaders;