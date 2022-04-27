import React from "react";
import "./header.css";
import Dropdown from "react-bootstrap/Dropdown";

export default function Header(props) {
  return (
    <div data-testid="header">
      <div className={props.darkMode ? "header-flex-dark" : "header-flex"}>
        <div className="logo-display">
          {/* <button onClick={props.logOut}></button> */}
          <img
            alt="Logo"
            src="https://images.squarespace-cdn.com/content/v1/5ffb1a1492e37d475767ab9a/1612779241752-J2PFODJ7U3QN5NIA3YDI/1.png?format=200w"
          />
        </div>
        {props.cook ? (
          <div className="btn-div">
            <Dropdown>
              <Dropdown.Toggle variant="success" id={props.darkMode ? "dropdown-basic-dark" : "dropdown-basic"} className="cc">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill={props.darkMode ? "black" : "#e7530b"}
                  className="bi bi-person-fill"
                  viewBox="2 2 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
                <span>
                  Signed in as: <u>{props.cook}</u>
                </span>
              </Dropdown.Toggle>{" "}
              <Dropdown.Menu>
                {props.cook == "admin@sigmalabs.co.uk" ? <Dropdown.Item href="http://localhost:3000/dashboard">Dashboard</Dropdown.Item> : <></>}
                <Dropdown.Item onClick={props.logOut} className="log-out">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
