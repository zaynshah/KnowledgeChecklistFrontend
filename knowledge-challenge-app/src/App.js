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
            <StudentDashboard logOut={deleteCookiesOnLogOut} />
          ) : (
            <>
              <Redirect to="/" />
            </>
          )}
        </Route>

        {/* <Route exact path="/">
          <Redirect to="/homepage" />
        </Route>

        <Route path="/homepage">
          <Homepage setIsLoggedIn={setIsLoggedIn} />
        </Route>

        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <StudentDashboard /> : <Redirect to="/homepage" />
          }
        ></Route> */}
      </Switch>
    </div>
  );
}

export default App;
