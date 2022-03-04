import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function LogInModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await props.postLogin(email, password);
      if (!response.success) {
        throw new Error("Invalid email or password");
      } else {
        props.setIsLoggedIn(true);
      }
    } catch (error) {
      setSuccess(false);
      setError(error.toString());
    }
  };

  function vuePassword(e) {
    setShowPassword(!showPassword);
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log in to account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={handlePasswordChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cohort-id">
            <Form.Check type="switch" id="custom-switch" label="Show Password" onChange={vuePassword} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}.
          </div>
        ) : null}
        <Button variant="outline-dark" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleLogin}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
