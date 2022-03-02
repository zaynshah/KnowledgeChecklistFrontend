import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ConfidenceButton from "../ConfidenceButton";
import userEvent from "@testing-library/user-event";

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

describe("Confidence buttons should be render properly", () => {
  test("Rendering a confidence button", () => {
    render(
      <Router>
        <ConfidenceButton />
      </Router>
    );
  });
});

// describe("Confidence buttons should be firing properly", () => {
//   test("Clicking a confidence button", () => {
//     render(
//       <Router>
//         <ConfidenceButton />
//       </Router>
//     );

//     userEvent.click(screen.getByText("Welcome"));
//     expect(screen.getByLabelText("Check")).toBeChecked();
//     expect(onclick).toHaveBeenCalledTimes(1);
//   });
// });
