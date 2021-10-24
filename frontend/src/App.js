import "./App.css";
import React, { Component } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Room from "./pages/Room";
import GlobalStyles from "./GlobalStyles";
import theme from "./theme";
import ErrorPage from "./pages/ErrorPage";
import SelectQuestion from "./pages/SelectQuestion";
import NavBarManager from "./pages/home/NavBarManager";
import Register from "./pages/Register";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                <Router>
                    <NavBarManager />
                    <div style={{ paddingTop: "60px", textAlign: "center" }}>
                        <Switch>
                            <Route path="/room">
                                <Room />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/selectquestion">
                                <SelectQuestion />
                            </Route>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/">
                                <ErrorPage />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
