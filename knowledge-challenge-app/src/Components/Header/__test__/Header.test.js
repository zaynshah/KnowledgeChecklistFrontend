import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Network from "../../Networking";

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
