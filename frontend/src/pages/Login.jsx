import React from "react";
import { Button, TextField, Grid, Paper, Typography, Link } from "@material-ui/core";
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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "", authflag: 1, errorMessage: "", error: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            email: event.state.email,
            password: event.state.password,
        });
    }

    async handleSubmit(event) {
        this.setState({ error: false });
        event.preventDefault();
        const data = { email: this.state.email, password: this.state.password };
        try {
            const response = await axios.post(`${endpoints.userService}/login`, data);
            // successful login
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("id", response.data.id);
            this.props.history.push("/selectquestion");
        } catch (e) {
            this.setState({ error: true, errorMessage: e.response.data.message });
        }
    }

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
                                    Sign in
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
                                        <Grid item>
                                            <TextField
                                                type="password"
                                                placeholder="Password"
                                                fullWidth
                                                name="password"
                                                variant="outlined"
                                                value={this.state.password}
                                                onChange={(event) =>
                                                    this.setState({
                                                        [event.target.name]: event.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </Grid>
                                        {this.state.error && (
                                            <Grid item>
                                                <Typography
                                                    classes={classes.errorMessage}
                                                    color="error"
                                                >
                                                    {this.state.errorMessage}
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
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Create account.
                                </Link>
                            </Grid>
                            <Grid>
                                <Link href="/forgotPassword" variant="body2">
                                    Forgot Password?
                                </Link>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(withRouter(Login));
