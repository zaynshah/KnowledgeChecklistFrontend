import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogInModal from "../../LogInModal";
import LoginModalForm from "../LoginModalForm";
import Network from "../../Networking";

// *--- Please Read --*

// There are known issues with testing bootstrap modals:
// https://github.com/reactjs/react-modal/issues/694

// Instead, following examples posted on react-bootstrap repo:
// https://github.com/react-bootstrap/react-bootstrap/blob/master/test/ModalTitleSpec.tsx

// Workaround: create a new component
// that replicate only the form from the modal, <Form></Form> elements
// and then place data-testids within this component

const network = new Network();

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

describe("Login modal form should be render properly", () => {
  test("Rendering a login modal form", () => {
    <Router>
      <LogInModal />
    </Router>;
  });
});

describe("Login form should include all elements", () => {
  test("Login form should include email field", () => {
    render(
      <Router>
        <LoginModalForm />
      </Router>
    );

    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeInTheDocument();
  });

  test("Login form should include password field", () => {
    render(
      <Router>
        <LoginModalForm />
      </Router>
    );

    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeInTheDocument();
  });

  test("Login form should include password switch", () => {
    render(
      <Router>
        <LoginModalForm />
      </Router>
    );

    const showPassword = screen.getByTestId("toggle-show-password");
    expect(showPassword).toBeInTheDocument();
  });
});

// Tests below will fail if backend server.js is not running
// Open new terminal, cd /KnowledgeChecklistBackend and run
// denon run -A server.js

network.postUser("react_test@gmail.com", "password123", 2);

describe("Login form validators should be included - Please ensure seed data is ran, and backend server.js is running.", () => {
  test("Valid email and password combination should return success", async () => {
    const response = await network.postLogin(
      "react_test@gmail.com",
      "password123"
    );
    expect(response.success).toBeFalsy();
  });

  test("Invalid email should return error", async () => {
    const response = await network.postLogin("", "password123");
    expect(response.success).toBeFalsy();
  });

  test("Invalid password should return error", async () => {
    const response = await network.postLogin("react_test@gmail.com", "");
    expect(response.success).toBeFalsy();
  });
});
