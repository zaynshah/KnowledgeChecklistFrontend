import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Homepage from "./Components/Homepage";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import MyDocument from "./MyDocument";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import Header from "./Components/Header";

function App() {
  const [cookies, setCookie] = useCookies();
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
            <StudentDashboard
              cookies={cookies}
              logOut={deleteCookiesOnLogOut}
            />
          ) : (
            <>
              <Redirect to="/" />
            </>
          )}
        </Route>
        <Route path="/test">
          <MyDocument />
        </Route>
      </Switch>
    </div>
  );
}

// ReactDOM.render(<MyDocument />, `${__dirname}/example.pdf`);

export default App;
