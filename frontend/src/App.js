import "./App.css";
import React, { Component } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Room from "./pages/Room";
import GlobalStyles from "./GlobalStyles";
import theme from "./theme";
import ErrorPage from "./pages/ErrorPage";
import SelectQuestion from "./pages/SelectQuestion";
import NavBarManager from "./components/navigation/NavBarManager";
import AuthProvider from "./components/Authentication/AuthContext";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Register from "./pages/Register";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                <Router>
                    <AuthProvider>
                        <NavBarManager />
                        <div style={{ paddingTop: "60px", textAlign: "center" }}>
                            <Switch>
                                <PrivateRoute path="/room" component={SelectQuestion} />
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
                                <PrivateRoute path="/selectquestion" component={SelectQuestion} />
                                <Route path="/" exact>
                                    <Home />
                                </Route>
                                <Route path="/">
                                    <ErrorPage />
                                </Route>
                            </Switch>
                        </div>
                    </AuthProvider>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
