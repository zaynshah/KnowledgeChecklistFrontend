import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Homepage from "./Components/Homepage";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import Header from "./Components/Header";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import ViewData from "./Components/AdminDashboard/ViewData";
import ViewResult from "./Components/AdminDashboard/ViewResult";

function App() {
  const [cookies, setCookie] = useCookies();
  const [isLoggedIn, setIsLoggedIn] = useState(cookies.sessionId);
  const [admin, setAdmin] = useState(cookies.isAdmin);

  const deleteCookiesOnLogOut = () => {
    setCookie("login", "");
    setCookie("isAdmin", "");
    setCookie("userID", "");
    setCookie("email", "");
    setCookie("sessionId", "");
    setIsLoggedIn("");
  };
  const cookieOnLoginIn = (user, email, session, admin) => {
    setCookie("userID", user, { path: "/" });
    setCookie("email", email, { path: "/" });
    setCookie("login", true, { path: "/" });
    setCookie("sessionId", session, { path: "/" });
    setCookie("isAdmin", admin, { path: "/" });
    setAdmin(admin);
  };

  console.log(cookies);
  console.log(document.cookie);
  return (
    <div className="App-Wrapper">
      <Switch>
        <Route exact path="/">
          {!isLoggedIn ? (
            <Homepage logIn={cookieOnLoginIn} setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <>
              <Redirect to="/dashboard" />
            </>
          )}
        </Route>

        <Route path="/dashboard">
          {isLoggedIn ? (
            admin === "true" ? (
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
        <Route
          path="/cohorts"
          render={(props) => <ViewData {...props} cookies={cookies} logOut={deleteCookiesOnLogOut} isLog={isLoggedIn} />}
        ></Route>
        <Route path="/data" render={(props) => <ViewResult {...props} cookies={cookies} logOut={deleteCookiesOnLogOut} isLog={isLoggedIn} />}></Route>
        <Route>
          <Header cook={cookies.email} logOut={deleteCookiesOnLogOut} />
          <p></p>
          <h1>Error! Page Not Found</h1>
          <Link to="/">Return back to login or dashboard</Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
