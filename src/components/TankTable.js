import React, { useState, useEffect, useContext } from 'react';
import '../App.js';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


function TankTable(props) {
  
    const [playoffTeams, setPlayoffTeams] = useState([])
  
    const [currentTankLeaders, setTankLeaders] = useState("");

    const arrExpectedLotteryTeams = []
    console.log(props.lotteryT);

    useEffect(() => {
        fetch('/tank_leaders').then(res => res.json()).then(data => {
          console.log(data)
          setTankLeaders(data)
        });
      }, [])

  
    useEffect(() => {
      fetch('/playoff_teams').then(res => res.json()).then(data => {
        console.log(data)
        setPlayoffTeams(data)
      });
    }, [])

    props.expectedLotteryT.forEach(team=>arrExpectedLotteryTeams.push(team.TeamCity))
    return (
        <TableContainer>

            <Table  className="draft-board">
                <TableHead>
                    <TableRow className="headers">
                        <TableCell>Draft Pos</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell align="right">Win Percentage</TableCell>
                        <TableCell align="right">Record</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.lotteryT.map((team,index) =>{
                    var index = index+1;
                    var change = arrExpectedLotteryTeams.indexOf(team.TeamCity) - index + 1;
                    return (
                    <TableRow key={team.TeamCity}>
                        <TableCell className='order'> 
                            <div className = 'pick-container'>{index} 
                            <div className = 'change' style={{display: change === 0 ? "none" : "inline-block" , color: change > 0 ? "green" : "red"}}>
                                {arrExpectedLotteryTeams.indexOf(team.TeamCity) - index + 1}
                            </div>
                            </div> 
                        </TableCell>
                        <TableCell className='city'>{team.TeamCity}</TableCell>
                        <TableCell align="right" className='win-pct'>{team.WinPCT}</TableCell>
                        <TableCell align="right" className='record'>{team.Record}</TableCell>
                    </TableRow>
                    )})}
                    <TableRow>
                        <TableCell className='lottery-break'colspan="4">LOTTERY ENDS HERE</TableCell>
                    </TableRow>
                    {playoffTeams.map((team, index) => {
                    var index = index+15;

                    var row = <TableRow key={team.TeamCity}>
                        <TableCell className='order'>{index}</TableCell>
                        <TableCell className='city'>{team.TeamCity}</TableCell>
                        <TableCell align="right" className='win-pct'>{team.WinPCT}</TableCell>
                        <TableCell align="right" className='record'>{team.Record}</TableCell>
                    </TableRow>
                    return row
                })}
                </TableBody>
            </Table>
        </TableContainer>

    );

      
}

export default TankTable