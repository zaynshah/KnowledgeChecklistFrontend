import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Network from "./Networking";

function SignupModal(props) {
  const network = new Network();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cohort_id, setCohort_id] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cohortError, setCohortError] = useState("is-invalid");
  const [disableButton, setDisableButton] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [cohortList, setCohortList] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    (async () => {
      setCohortList(await network.getCohorts());
    })();
  }, []);

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
    if (e.target.value == "choose") {
      setCohortError("is-invalid");
      setCohort_id("");
      setDisableButton(true);
    } else {
      setCohort_id(parseInt(e.target.value));
      setCohortError("");
    }
  }

  const checkInputs = () => {
    if (email) {
      if (password !== confirmPassword || password.length < 8) {
        setPasswordError("is-invalid");
        setDisableButton(true);
      } else if (typeof cohort_id != "number") {
        setCohortError("is-invalid");
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
        setSuccess(true);
        setError("");
        setEmail("");
        setPassword("");
        setCohort_id("");
        setConfirmPassword("");
      }
    } catch (error) {
      setSuccess(false);
      setError(error.toString());
    }
  }

  function createCohort() {
    if (!cohortList) {
      return <></>;
    }

    return cohortList.map((i) => <option key={`${i.cohort_id}`}>{i.cohort_id}</option>);
  }

  function vuePassword(e) {
    setShowPassword(!showPassword);
  }

  return (
    <Modal data-testid="modal" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control data-testid="email-input" type="email" placeholder="Enter Email" value={email} onChange={handleEmail} />
            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              data-testid="password-input"
              className={passwordError}
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter Password"
              onChange={handlePassword}
            />
            <Form.Text className="text-muted">Password must contain at least 8 characters.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              data-testid="confirm-password-input"
              className={passwordError}
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handlePasswordConfirm}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cohort-id">
            <Form.Check type="switch" id="custom-switch" label="Show Password" onChange={vuePassword} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="cohort-id">
            <Form.Label>Cohort</Form.Label>
            <Form.Select className={cohortError} onChange={handleCohortId}>
              <option value="choose">--Please select a cohort--</option>
              {createCohort()}
            </Form.Select>
            <Form.Text className="text-muted">Contact administrator if cohort is not available</Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {error ? (
          <Alert className="alert alert-danger" role="alert">
            {error}
          </Alert>
        ) : null}
        {success ? (
          <div className="alert alert-success" role="alert">
            Account created successfully!
          </div>
        ) : null}
        <Button variant="outline-dark" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleSubmit} disabled={disableButton}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupModal;
