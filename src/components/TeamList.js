import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../App.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

function TeamList(props) {

    const classes = useStyles();
    return (
        <FormControl className = {classes.formControl}>
            <InputLabel id="demo-simple-select-label">Team</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.team}
            onChange={props.changeHandler}
            >
            <MenuItem value={''}>All Teams</MenuItem>
            <MenuItem value={'Atlanta'}>Atlanta Hawks</MenuItem>
            <MenuItem value={'Boston'}>Boston Celtics</MenuItem>
            <MenuItem value={'Brooklyn'}>Brooklyn Nets</MenuItem>
            <MenuItem value={'Charlotte'}>Charlotte Hornets</MenuItem>
            <MenuItem value={'Chicago'}>Chicago Bulls</MenuItem>
            <MenuItem value={'Cleveland'}>Cleveland Cavaliers</MenuItem>
            <MenuItem value={'Dallas'}>Dallas Mavericks</MenuItem>
            <MenuItem value={'Denver'}>Denver Nuggets</MenuItem>
            <MenuItem value={'Detroit'}>Detroit Pistons</MenuItem>
            <MenuItem value={'Golden State'}>Golden State Warriors</MenuItem>
            <MenuItem value={'Houston'}>Houston Rockets</MenuItem>
            <MenuItem value={'Indiana'}>Inidiana Pacers</MenuItem>
            <MenuItem value={'LA'}>Los Angeles Clippers</MenuItem>
            <MenuItem value={'Los Angeles'}>Los Angeles Lakers</MenuItem>
            <MenuItem value={'Memphis'}>Memphis Grizzlies</MenuItem>
            <MenuItem value={'Miami'}>Miami Heat</MenuItem>
            <MenuItem value={'Milwaukee'}>Milwaukee Bucks</MenuItem>
            <MenuItem value={'Minnesota'}>Minnesota Timberwolves</MenuItem>
            <MenuItem value={'New Orleans'}>New Orleans Pelicans</MenuItem>
            <MenuItem value={'New York'}>New York Knicks</MenuItem>
            <MenuItem value={'Oklahoma City'}>Oklahoma City Thunder</MenuItem>
            <MenuItem value={'Orlando'}>Orlando Magic</MenuItem>
            <MenuItem value={'Philadelphia'}>Philadelphia 76ers</MenuItem>
            <MenuItem value={'Phoenix'}>Phoenix Suns</MenuItem>
            <MenuItem value={'Portland'}>Portland Trailblazers</MenuItem>
            <MenuItem value={'Sacramento'}>Sacramento Kings</MenuItem>
            <MenuItem value={'Toronto'}>Toronto Raptors</MenuItem>
            <MenuItem value={'Utah'}>Utah Jazz</MenuItem>
            <MenuItem value={'Washington'}>Washington Wizards</MenuItem>

            </Select>
        </FormControl>
    )

}

export default TeamList;