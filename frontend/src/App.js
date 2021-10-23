import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Room from "./pages/Room";
import ErrorPage from "./pages/ErrorPage";
import SelectQuestion from "./pages/SelectQuestion";
import AuthProvider from "./components/Authentication/AuthContext";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Register from "./pages/Register";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute path="/room" component={SelectQuestion} />
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <PrivateRoute path="/selectquestion" component={SelectQuestion} />
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/">
                                <ErrorPage />
                            </Route>
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        );
    }
}

export default App;
