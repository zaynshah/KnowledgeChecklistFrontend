import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function SignupModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cohort_id, setCohort_id] = useState(1);
  const [passwordError, setPasswordError] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

  const checkInputs = () => {
    if (email) {
      if (password !== confirmPassword || password.length < 8) {
        setPasswordError("is-invalid");
        setDisableButton(true);
      } else if (password && confirmPassword) {
        setPasswordError("");
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
  };

  useEffect(() => {
    checkInputs();
  });

  async function handleSubmit(e) {
    try {
      const response = await props.postUser(email, password, cohort_id);
      const json = await response.json();
      if (response.status >= 400) {
        throw new Error(json.error);
      } else {
        setError("");
        setEmail("");
        setPassword("");
        setCohort_id(1);
        setConfirmPassword("");
      }
    } catch (error) {
      setSuccess(false);
      setError(error.toString());
    }
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
              placeholder="Enter Email"
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
              className={passwordError}
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={handlePassword}
            />
            <Form.Text className="text-muted">
              Password must contain at least 8 characters.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              className={passwordError}
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
              placeholder="Enter Cohort"
              onChange={handleCohortId}
            />
            <Form.Text className="text-muted">
              Cohort must be a number
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {error ? (
          <Alert className="alert alert-danger" role="alert">
            {error}
          </Alert>
        ) : null}
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={disableButton}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupModal;
