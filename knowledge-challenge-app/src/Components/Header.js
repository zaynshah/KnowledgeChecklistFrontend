import React from "react";
import "./header.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";

export default function Header(props) {
  return (
    <div>
      <div className="header-flex">
        <div className="logo-display">
          <img
            alt="Logo"
            src="https://images.squarespace-cdn.com/content/v1/5ffb1a1492e37d475767ab9a/1612779241752-J2PFODJ7U3QN5NIA3YDI/1.png?format=200w"
          />
        </div>
        <div className="btn-div">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="cc"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-fill"
                viewBox="2 2 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <span>
                Signed in as: <u>zayn shah</u>
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={props.logOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
