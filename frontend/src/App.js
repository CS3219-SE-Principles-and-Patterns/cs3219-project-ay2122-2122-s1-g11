import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Room from "./pages/Room";
import ErrorPage from "./pages/ErrorPage";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/room">
                        <Room />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/">
                        <ErrorPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
