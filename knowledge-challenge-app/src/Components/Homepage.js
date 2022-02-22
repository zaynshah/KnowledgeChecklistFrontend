import React, { useState, useEffect } from "react";
import Signup from "./Signup";

function Homepage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const handleShowSignUp = () => {
    setShowSignUp(!showSignUp);
  };
  const handleShowLogIn = () => {
    setShowSignUp(!showLogIn);
  };

  return (
    <div className="App-Wrapper">
      <h1>Welcome</h1>
      <Signup show={showSignUp} handleClose={handleShowSignUp} />
      <button onClick={handleShowSignUp}>Register</button>
      <button onClick={handleShowLogIn}> Login</button>
    </div>
  );
}

export default Homepage;
