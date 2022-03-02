import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
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

describe("Confidence buttons should be firing properly", () => {
  test("Clicking a confidence button", () => {
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
