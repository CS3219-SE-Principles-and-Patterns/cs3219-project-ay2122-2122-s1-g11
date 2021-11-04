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
import QuestionProvider from "./components/QuestionSelection/QuestionContext";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

class App extends Component {
    isAuthenticated = () => {
        return Boolean(localStorage.getItem("token"));
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles />
                <Router>
                    <AuthProvider>
                        <NavBarManager isAuthenticated={this.isAuthenticated} />
                        <div style={{ paddingTop: "60px", textAlign: "center" }}>
                            <Switch>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/register">
                                    <Register />
                                </Route>
                                <Route path="/forgotPassword">
                                    <ForgotPassword />
                                </Route>
                                <Route path="/resetPassword">
                                    <ResetPassword />
                                </Route>
                                <Route path="/" exact>
                                    <Home />
                                </Route>
                                <QuestionProvider>
                                    <PrivateRoute path="/room" component={Room} />
                                    <PrivateRoute path="/selectquestion" component={SelectQuestion} />
                                    <Route path="/" component={ErrorPage} />
                                </QuestionProvider>
                            </Switch>
                        </div>
                    </AuthProvider>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
