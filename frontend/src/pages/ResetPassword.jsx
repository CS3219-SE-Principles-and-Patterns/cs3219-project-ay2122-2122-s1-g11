import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
  form: {
      marginTop: '5em'
  },
  button: {
      marginTop: '1em'
  },
  message: {
    marginTop: '0.5em'
}
}));

export default function ResetPassword(props) {
  const classes = useStyles();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    if (password1 !== password2) {
        setMessage('Passwords do not match');
        setError(true);
        return;
    } else {
        axios.put(`http://localhost:4000${location.pathname}${location.search}`, { password: password2 })
            .then(response => {
                setMessage(response.data.message);
            }).catch(error => {
                setError(true);
                setMessage(error.response.data.message);
            })
    }
    
  }

  return (
    <Grid container direction="row" justify="center" spacing={2}>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid className={classes.form} item>
                <TextField onChange={(event) => setPassword1(event.target.value)}
                    required label="Password" 
                    name="password1" 
                    type="password"
                />
            </Grid>
            <Grid className={classes.form} item>
                <TextField onChange={(event) => setPassword2(event.target.value)}
                    required label="Repeat Password" 
                    name="password2" 
                    type="password"
                />
            </Grid>
            <Grid className={classes.button} item><Button onClick={handleSubmit} variant="contained">Submit</Button></Grid>
            <Grid className={classes.message} item><Typography color={error ? 'error' : 'textSecondary'}>{message}</Typography></Grid>
        </form>
    </Grid>
  );
}
