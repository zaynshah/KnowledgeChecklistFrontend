import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import SignupModal from "./SignupModal";
import Network from "./Networking";
import LogInModal from "./LogInModal";


function Homepage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const handleShowSignUp = () => {
    setShowSignUp(!showSignUp);
  };
  const handleShowLogIn = () => {
    setShowLogIn(!showLogIn);
  };

  return (

    <Container className="py-4 m-5 p-5">
      <SignupModal show={showSignUp} handleClose={handleShowSignUp} network={new Network()} />
      <LogInModal show={showLogIn} handleClose={handleShowLogIn} />
      <h1 className="mb-4">Welcome to the Knowledge Checklist.</h1>
      <div className="">
        <p className="fs-5 mb-4">
          Use the buttons below to register or log in.
        </p>
        <Button variant="outline-dark" className="" onClick={handleShowSignUp}>
          Register
        </Button>{" "}
        <Button variant="dark" onClick={handleShowLogIn}>
          Login
        </Button>
      </div>
    </Container>
  );
}

export default Homepage;
