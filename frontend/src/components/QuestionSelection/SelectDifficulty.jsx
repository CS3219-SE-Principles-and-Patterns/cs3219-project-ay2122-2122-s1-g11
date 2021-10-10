import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const SelectDifficulty = ({ onSelect }) => {
    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <h2>Please select the difficulty of your questions</h2>
            <Button variant="contained" size="large" className={classes.margin} onClick={onSelect}>
                Easy
            </Button>
            <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.margin}
                onClick={onSelect}
            >
                Medium
            </Button>
            <Button
                variant="contained"
                size="large"
                color="secondary"
                className={classes.margin}
                onClick={onSelect}
            >
                Hard
            </Button>
        </div>
    );
};

export default SelectDifficulty;
