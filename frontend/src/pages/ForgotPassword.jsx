import React from "react";
import { Button, TextField, Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import { withRouter } from "react-router";
import { endpoints } from "../api/endpoints";

const styles = (theme) => ({
    loginForm: {
        justifyContent: "center",
        minHeight: "90vh",
    },
    buttonBlock: {
        width: "100%",
    },
    loginBackground: {
        justifyContent: "center",
        minHeight: "30vh",
        padding: "50px",
    },
});

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", error: false, message: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: false });
        axios
            .patch(`${endpoints.userService}/forgotPassword`, { email: this.state.email })
            .then((response) => {
                this.setState({ message: response.data.message });
            })
            .catch((error) => {
                this.setState({ error: true });
                this.setState({ message: "Email does not exist. Please try again." });
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={0} justify="center" direction="row">
                <Grid item>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        spacing={2}
                        className={classes.loginForm}
                    >
                        <Paper
                            variant="elevation"
                            elevation={2}
                            className={classes.loginBackground}
                        >
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Forgot Password
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form onSubmit={this.handleSubmit}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <TextField
                                                type="email"
                                                placeholder="Email"
                                                fullWidth
                                                name="email"
                                                variant="outlined"
                                                value={this.state.email}
                                                onChange={(event) =>
                                                    this.setState({
                                                        [event.target.name]: event.target.value,
                                                    })
                                                }
                                                required
                                                autoFocus
                                            />
                                        </Grid>
                                        {this.state.error && (
                                            <Grid item>
                                                <Typography
                                                    color="error"
                                                >
                                                    {this.state.message}
                                                </Typography>
                                            </Grid>
                                        )}
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                className={classes.buttonBlock}
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(withRouter(ForgotPassword));

