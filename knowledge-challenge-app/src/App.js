import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import React from "react";
import SignupModal from "./Components/SignupModal";

function App() {
  return (
    <div className="App-Wrapper">
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/Homepage" />
        </Route>
        <Route path="/Homepage">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
