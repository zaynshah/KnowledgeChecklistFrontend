import Form from "react-bootstrap/Form";
import React, { useState } from "react";

function SignupModalForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cohortError, setCohortError] = useState("is-invalid");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <Form data-testid="login-form" noValidate>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            data-testid="email-input"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            // onChange={handleEmail}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password-input"
            className={passwordError}
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            placeholder="Enter Password"
            // onChange={handlePassword}
          />
          <Form.Text className="text-muted">
            Password must contain at least 8 characters.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            data-testid="confirm-password-input"
            className={passwordError}
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            // onChange={handlePasswordConfirm}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cohort-id">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Show Password"
            // onChange={vuePassword}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cohort-id">
          <Form.Label>Cohort</Form.Label>
          <Form.Select aria-readonly className={cohortError}>
            <option value="choose">--Please select a cohort--</option>
            {/* {createCohort()} */}
          </Form.Select>
          <Form.Text className="text-muted">
            Contact administrator if cohort is not available
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SignupModalForm;
