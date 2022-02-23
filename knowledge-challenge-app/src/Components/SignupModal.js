import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignupModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cohort_id, setCohort_id] = useState(0);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handlePasswordConfirm(e) {
    setConfirmPassword(e.target.value);
  }

  function handleCohortId(e) {
    setCohort_id(parseInt(e.target.value));
  }

  async function handleSubmit(e) {
    const response = await props.postUser(email, password, cohort_id);

    setEmail("");
    setPassword("");
    setCohort_id("");
    setConfirmPassword("");
    console.log(response);
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmail}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePassword}
            />
            <Form.Text className="text-muted">
              Password must contain at least 8 characters.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handlePasswordConfirm}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cohort-id">
            <Form.Label>Cohort</Form.Label>
            <Form.Control
              type="text-muted"
              value={cohort_id}
              placeholder="Cohort"
              onChange={handleCohortId}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="secondary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupModal;
