import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import StudentDashboard from "../StudentDashboard";

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

describe("Student Dashboard should include all elements", () => {
  test("Welcome message must load", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );
    const welcomeMessage = screen.getByTestId("welcome");
    expect(welcomeMessage).toBeInTheDocument();
  });
  test("Progress bar must load", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );
    const progressBar = screen.getByTestId("progressBar");
    expect(progressBar).toBeInTheDocument();
  });
  test("Side navbar must load", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeInTheDocument();
  });
  test("Save to pdf button must load", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );
    const pdfButton = screen.getByTestId("pdfButton");
    expect(pdfButton).toBeInTheDocument();
  });
});

describe("Save to PDF button should be firing properly", () => {
  test("Clicking the save to pdf button", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );

    userEvent.click(screen.getByText("Check"));
    expect(screen.getByLabelText("Check")).toBeChecked();
    expect(onclick).toHaveBeenCalledTimes(1);
  });
});
