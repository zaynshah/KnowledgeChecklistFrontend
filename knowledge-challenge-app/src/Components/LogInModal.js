import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function LogInModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await props.postLogin(email, password);
      let json = await response.json();
      if (!json.success) {
        throw new Error("Invalid email or password");
      } else {
        props.setIsLoggedIn(true);
      } //something to do with keeping user logged in goes here
    } catch (error) {
      setSuccess(false);
      setError(error.toString());
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log in to account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}.
          </div>
        ) : null}
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
