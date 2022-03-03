import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignupModal from "../../SignupModal";
import SignupModalForm from "../SignupModalForm";

// *--- Please Read --*

// There are known issues with testing bootstrap modals:
// https://github.com/reactjs/react-modal/issues/694

// Instead, following examples posted on react-bootstrap repo:
// https://github.com/react-bootstrap/react-bootstrap/blob/master/test/ModalTitleSpec.tsx

// Workaround: create a new component
// that replicate only the form from the modal, <Form></Form> elements
// and then place data-testids within this component

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Register form should be render properly", () => {
  test("Rendering a register", () => {
    <Router>
      <SignupModal />
    </Router>;
  });
});

describe("Register form should be render properly", () => {
  test("Rendering a register without importing", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );
  });
});

describe("Register form should include all elements", () => {
  test("Register should include email field", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeInTheDocument();
  });

  test("Register should include password field", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeInTheDocument();
  });

  test("Register should include confirm password field", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const confirmPasswordInput = screen.getByTestId("confirm-password-input");
    expect(confirmPasswordInput).toBeInTheDocument();
  });
});

describe("Register form elements should be visible", () => {
  test("Register should include email field", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeVisible();
  });

  test("Register should include password field", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeVisible();
  });

  test("Register should include confirm password field", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const confirmPasswordInput = screen.getByTestId("confirm-password-input");
    expect(confirmPasswordInput).toBeVisible();
  });
});

describe("Register form elements should have correct label", () => {
  test("Email label should be present and correct", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const emailLabel = screen.getByLabelText(/Email address/i);
  });

  test("Password label should be present and correct", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const passwordLabel = screen.getByLabelText("Password");
  });

  test("Confirm password label should be present and correct", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const confirmPasswordLabel = screen.getByLabelText(/Confirm password/i);
  });

  test("Cohort label should be present and correct", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const cohortLabel = screen.getByLabelText(/Cohort/i);
  });
});

describe("Register form elements should have correct placeholders", () => {
  test("Email placeholder should be present and correct", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const emailHolder = screen.getByPlaceholderText(/Enter email/i);
  });

  test("Password placeholder should be present and correct", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const passwordHolder = screen.getByPlaceholderText(/Enter password/i);
  });

  test("Confirm Password placeholder should be present and correct", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    const confirmPasswordHolder =
      screen.getByPlaceholderText(/Confirm password/i);
  });
});

describe("Register form elements should have correct values", () => {
  test("Email value should be present and correct", () => {
    render(
      <Router>
        <SignupModalForm />
      </Router>
    );

    expect(screen.getByTestId("login-form")).toHaveFormValues({
      email: "",
      password: "",
      confirmPassword: "",
    });
  });
});

describe("Register form validators should be working properly", () => {});
