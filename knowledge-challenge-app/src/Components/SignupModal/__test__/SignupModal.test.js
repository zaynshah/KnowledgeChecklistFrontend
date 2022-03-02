import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignupModal from "../../SignupModal";

const testCookies = {
  sessionId: "dca40c1e-df73-441c-8706-174c1d262ce7",
  userID: "2",
  email: "zayn68@gmail.com",
  isAdmin: "0",
};

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

describe("Register form should include all elements", () => {
  test("Register should include email field", () => {
    render(
      <Router>
        <SignupModal />
      </Router>
    );

    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeInTheDocument();
  });

  test("Register should include password field", () => {
    render(
      <Router>
        <SignupModal />
      </Router>
    );

    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeInTheDocument();
  });

  test("Register should include confirm password field", () => {
    render(
      <Router>
        <SignupModal />
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
        <SignupModal />
      </Router>
    );

    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeVisible();
  });

  test("Register should include password field", () => {
    render(
      <Router>
        <SignupModal />
      </Router>
    );

    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeVisible();
  });

  test("Register should include confirm password field", () => {
    render(
      <Router>
        <SignupModal />
      </Router>
    );

    const confirmPasswordInput = screen.getByTestId("confirm-password-input");
    expect(confirmPasswordInput).toBeVisible();
    screen.debug();
  });
});
