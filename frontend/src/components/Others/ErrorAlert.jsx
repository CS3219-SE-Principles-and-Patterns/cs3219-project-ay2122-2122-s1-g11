import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const ErrorAlert = ({ msg, display }) => {
    const useStyles = makeStyles((theme) => ({
        alertSpacing: {
            margin: "20px 50px",
            padding: "10px 40px",
        },
    }));

    const classes = useStyles();
    console.log(msg);

    return (
        <Alert className={classes.alertSpacing} severity="error" style={{ display: display }}>
            {msg}
        </Alert>
    );
};

export default ErrorAlert;
