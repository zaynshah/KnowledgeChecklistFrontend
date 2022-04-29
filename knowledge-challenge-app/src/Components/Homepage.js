import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import SignupModal from "./SignupModal";
import Network from "./Networking";
import LogInModal from "./LogInModal";
import Header from "./Header";
import Footer from "./Footer";

const network = new Network();

function Homepage(props) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  const handleShowSignUp = () => {
    setShowSignUp(!showSignUp);
  };
  const handleShowLogIn = () => {
    setShowLogIn(!showLogIn);
  };

  return (
    <>
      <Header />
      <Container className="py-4 m-5 p-5">
        <SignupModal show={showSignUp} handleClose={handleShowSignUp} postUser={network.postUser} />
        <LogInModal
          show={showLogIn}
          handleClose={handleShowLogIn}
          postLogin={network.postLogin}
          logIn={props.logIn}
          setIsLoggedIn={props.setIsLoggedIn}
        />
        <h1 className="mb-4">Welcome to the Sigma Labs XYZ™ Knowledge Checklist</h1>
        <div className="">
          <p className="fs-5 mb-4">Use the buttons below to register or log in.</p>
          <Button variant="outline-dark" onClick={handleShowSignUp}>
            Register
          </Button>{" "}
          <Button variant="dark" onClick={handleShowLogIn}>
            Log In
          </Button>
        </div>
        <Footer />
      </Container>
    </>
  );
}

export default Homepage;
