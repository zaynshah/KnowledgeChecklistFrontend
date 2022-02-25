import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Homepage from "./Components/Homepage";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import MyDocument from "./MyDocument";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import Header from "./Components/Header";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ViewData from "./Components/AdminDashboard/ViewData";

function App() {
  const [cookies, setCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.sessionId);
  const [admin, setAdmin] = useState(cookies.isAdmin);

  const deleteCookiesOnLogOut = () => {
    setCookie("sessionId", "");
    setCookie("isAdmin", "");
    setCookie("userID", "");
    setCookie("email", "");
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
            admin === "1" ? (
              <AdminDashboard cookies={cookies} logOut={deleteCookiesOnLogOut} />
            ) : (
              <StudentDashboard cookies={cookies} logOut={deleteCookiesOnLogOut} />
            )
          ) : (
            <>
              <Redirect to="/" />
            </>
          )}
        </Route>
        <Route path="/test">
          <MyDocument />
        </Route>
        <Route path="/cohort" render={(props) => <ViewData {...props} cookies={cookies} logOut={deleteCookiesOnLogOut} isLog={isLoggedIn} />}></Route>
      </Switch>
    </div>
  );
}

// ReactDOM.render(<MyDocument />, `${__dirname}/example.pdf`);

export default App;
