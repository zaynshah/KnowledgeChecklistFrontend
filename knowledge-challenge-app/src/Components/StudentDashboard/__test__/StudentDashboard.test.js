import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import StudentDashboard from "../StudentDashboard";
import Network from "../../Networking";
import { useCookies } from "react-cookie";

const network = new Network();

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

describe("Student Dashboard component must render", () => {
  test("Student Dashboard must load", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );
  });
});

describe("Student Dashboard should include all elements", () => {
  test("Welcome message must load", async () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
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

  test("Save to pdf button must have correct type", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );
    const pdfButton = screen.getByTestId("pdfButton");
    expect(pdfButton).toHaveAttribute("type", "button");
  });

  test("Header must load", () => {
    render(
      <Router>
        <StudentDashboard />
      </Router>
    );

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });
});

describe("Components of student dashboard should be visible", () => {
  test("Side navigation bar is visible", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const navBar = screen.getByTestId("navBar");
    expect(navBar).toBeVisible();
  });

  test("Progress bar is visible", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const progressBar = screen.getByTestId("progressBar");
    expect(progressBar).toBeVisible();
  });

  test("PDF button is visible", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const pdfButton = screen.getByTestId("pdfButton");
    expect(pdfButton).toBeVisible();
  });

  test("Welcome message is visible", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const welcome = screen.getByTestId("welcome");
    expect(welcome).toBeVisible();
  });

  test("Footer is visible", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const footer = screen.getByTestId("footer");
    expect(footer).toBeVisible();
  });
});

// Write tests with dummy cookies

describe("Tests with dummy data", () => {
  test("Welcome message displays correct username", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const username = screen.getByTestId("welcome");
    expect(username).toHaveTextContent(/zayn68/);
  });

  test("Welcome message displays correct heading", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const heading = screen.getByTestId("welcome");
    expect(heading).toHaveTextContent(/use this checklist/);
  });

  test("Welcome message displays correct instructions", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const instructions = screen.getByTestId("welcome");
    expect(instructions).toHaveTextContent(/Select your level of confidence/);
  });

  test("PDF Button displays correct text", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const pdfButton = screen.getByTestId("pdfButton");
    expect(pdfButton).toHaveTextContent(/PDF/);
  });

  // Link isn't loading - need component to mount and update fully

  test("Side navigation bar displays correct links", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const javascriptLink = screen.getByTestId("navBar");
    expect(javascriptLink).toHaveTextContent(/Welcome/);
  });

  // Link isn't loading - need component to mount and update fully

  test("Side navigation bar displays correct links", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const topic = "HTML/CSS";
    const link = screen.getByTestId(topic);
    expect(link).toHaveTextContent(topic);
  });

  // Link isn't loading - need component to mount and update fully

  test("Side navigation bar displays correct links", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const topic = "React";
    const link = screen.getByTestId(topic);
    expect(link).toHaveTextContent(topic);
  });
});

// Javascript link isn't loading - need component to mount and update fully

describe("Checking child components are rendered properly from parent component", () => {
  test("Topic titles should render properly - 1. Javascript", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const topic = "Javascript";
    const username = screen.getByTestId(topic);
    expect(username).toHaveTextContent(topic);
  });

  test("Topic titles should render properly - 2. HTML/CSS", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const topic = "HTML/CSS";
    const username = screen.getByTestId(topic);
    expect(username).toHaveTextContent(topic);
  });

  test("Topic titles should render properly - 3. React", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const topic = "React";
    const username = screen.getByTestId(topic);
    expect(username).toHaveTextContent(topic);
  });
});

// May not be able to do this with Jest?
// Instead of checking state directly
// Check what appears on the page using dummy data

describe("Checking that the state is set properly with dummy data", () => {
  test("Check that the main dataset is loaded properly", () => {
    render(
      <Router>
        <StudentDashboard cookies={testCookies} />
      </Router>
    );
    const username = screen.getByTestId("welcome");
    expect(username).toHaveTextContent(/zayn68/);
  });
});

// describe("Save to PDF button should be firing properly", () => {
//   test("Clicking the save to pdf button", () => {
//     render(
//       <Router>
//         <StudentDashboard />
//       </Router>
//     );

//     const pdfButton = screen.getByTestId("pdfButton");
//     userEvent.click(pdfButton);
//     expect(onclick).toHaveBeenCalledTimes(1);
//   });
// });

// describe("Navbar buttons should be firing properly", () => {
//   test("Clicking the Welcome button", () => {
//     render(
//       <Router>
//         <StudentDashboard />
//       </Router>
//     );

//     userEvent.click(screen.getByTestId("welcome-button"));
//     expect(onselect).toHaveBeenCalledTimes(1);
//   });
// });
