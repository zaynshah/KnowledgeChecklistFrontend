import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Homepage from "./Components/Homepage";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";

function App() {
  const [cookies, setCookie] = useCookies(["sessionId"]);
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.sessionId);
  console.log(cookies);
  const deleteCookiesOnLogOut = () => {
    setCookie("sessionId", "");
    setIsLoggedIn("");
  };

  return (
    <div className="App-Wrapper">
      <Switch>
        <Route exact path="/">
          {!isLoggedIn ? (
            <Homepage setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <>
              <Redirect to="/dashboard" />
            </>
          )}
        </Route>

        <Route path="/dashboard">
          {isLoggedIn ? (
            <StudentDashboard head={cookies} logOut={deleteCookiesOnLogOut} />
          ) : (
            <>
              <Redirect to="/" />
            </>
          )}
        </Route>
        <Route path="/SigmaStudent99">
          <StudentDashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
