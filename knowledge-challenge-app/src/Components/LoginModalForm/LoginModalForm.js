import Form from "react-bootstrap/Form";
import React, { useState } from "react";

function LoginModalForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div>
      <Form noValidate>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            data-testid="email-input"
            type="email"
            placeholder="Enter email"
            value={email}
            readOnly
            // onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            readOnly
            // onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cohort-id">
          <Form.Check
            data-testid="toggle-show-password"
            type="switch"
            id="custom-switch"
            label="Show Password"
            readOnly
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default LoginModalForm;
