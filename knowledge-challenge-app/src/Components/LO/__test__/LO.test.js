import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LO from "../LO";

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

describe("Learning objective should be render properly", () => {
  test("Rendering a learning objective", () => {
    <Router>
      <LO />
    </Router>;
  });
});

// Test with dummy data

let description = "Understand what parent and child components are.";

describe("Learning objective should contain all elements", () => {
  test("Should contain a description", () => {
    <Router>
      <LO learningObjective={description} />
    </Router>;

    const learningObjectives = screen.getAllByTestId("LOs");
    console.log(learningObjectives);
    // expect(learningObjective).toHaveText(description);
  });
});
