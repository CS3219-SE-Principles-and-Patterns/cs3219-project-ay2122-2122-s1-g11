import React from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

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
    this.state = { username: "", password: "", authflag: 1 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      username: event.state.username,
      password: event.state.password,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
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
                  Sign up
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
                        name="username"
                        variant="outlined"
                        value={this.state.username}
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
                <Link href="#" variant="body2">
                  Already have an account? Sign in.
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(Login);
