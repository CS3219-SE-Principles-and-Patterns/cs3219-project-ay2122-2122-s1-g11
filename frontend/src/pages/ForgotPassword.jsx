import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { endpoints } from "../api/endpoints";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "40ch",
        },
    },
    form: {
        marginTop: "5em",
    },
    button: {
        marginTop: "1em",
    },
    message: {
        marginTop: "0.5em",
    },
}));

export default function ForgotPassword() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);
        axios
            .patch(`${endpoints.userService}/forgotPassword`, { email })
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                setError(true);
                setMessage("Email does not exist. Please try again.");
            });
    };

    return (
        <Grid container direction="row" justify="center" spacing={2}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid className={classes.form} item>
                    <TextField
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        label="Email"
                        name="email"
                        type="email"
                    />
                </Grid>
                <Grid className={classes.button} item>
                    <Button onClick={handleSubmit} variant="contained">
                        Submit
                    </Button>
                </Grid>
                <Grid className={classes.message} item>
                    <Typography color={error ? "error" : "textSecondary"}>{message}</Typography>
                </Grid>
            </form>
        </Grid>
    );
}
