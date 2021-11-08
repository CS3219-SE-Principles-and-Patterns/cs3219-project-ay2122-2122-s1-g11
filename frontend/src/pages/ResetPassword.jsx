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

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = { password1: "", password2: "", error: false, message: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: false });
        if (this.state.password1 !== this.state.password2) {
            this.setState({ message: "Passwords do not match" });
            this.setState({ error: true });
            return;
        } else {
            console.log('link: ', this.props.history)
            axios
                .put(`${endpoints.userService}/resetPassword${this.props.history}`, { password: this.state.password2 })
                .then((response) => {
                    this.setState({ message: response.data.message });
                })
                .catch((error) => {
                    this.setState({ error: true });
                    this.setState({ message: error.response.data.message });
                });
        }
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
                                                type="password"
                                                placeholder="Password"
                                                fullWidth
                                                name="password1"
                                                variant="outlined"
                                                value={this.state.password1}
                                                onChange={(event) =>
                                                    this.setState({
                                                        [event.target.name]: event.target.value,
                                                    })
                                                }
                                                required
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="password"
                                                placeholder="Confirm Password"
                                                fullWidth
                                                name="password2"
                                                variant="outlined"
                                                value={this.state.password2}
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
export default withStyles(styles)(withRouter(ResetPassword));


