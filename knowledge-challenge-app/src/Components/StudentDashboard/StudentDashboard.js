import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentDashboard.css";
import React, { useEffect, useRef, useState } from "react";
import Network from "../Networking";
import Header from "../Header";
import LO from "../LO/LO";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useReactToPrint } from "react-to-print";
import Scroll from "react-scroll";
import PrintToPDF from "../PrintToPDF/PrintToPDF";

export const StudentDashboard = React.forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [numberOfLOs, setNumberOfLOs] = useState(0);
  const [numberOfClickedLOs, setNumberOfClickedLOs] = useState(0);

  const network = new Network();

  function updateProgress() {
    return setNumberOfClickedLOs(numberOfClickedLOs + 1);
  }

  document.title = `${props.cookies.email}'s Knowledge Checklist`;

  useEffect(() => {
    (async () => {
      const data = await network.getAllTopicsPerStudent(props.cookies.userID);
      console.log(data);
      setData(data);

      setNumberOfLOs(data.length);
      console.log(numberOfLOs);
    })();
  }, []);

  function getWelcomeMessage(id) {
    return (
      <div id="welcome">
        <h1>Welcome, {id}. </h1>
        <h3>How to use this checklist:</h3>
        <main>
          <p>
            Select your level of confidence with the buttons next to each
            statement. Choosing 'not confident' will colour the statement red.
            Choosing 'needs revision' will colour the statement yellow. Finally,
            choosing 'feel confident' will colour the statement green:
          </p>
          <ul>
            <li>
              <span>Red</span> topics are those you don't understand well.
            </li>
            <li>
              <span>Yellow</span> topics are those that still need work.{" "}
            </li>
            <li>
              <span>Green</span> topics are the ones you feel most confident
              with.
            </li>
          </ul>{" "}
          <p>
            At the bottom of the page, there is a button to print / save your
            progress. Be sure to check the box 'background graphics' under more
            settings. This will allow you to save a PDF or print a version of
            the page with the selections you have made. Additionally, you may
            prefer landscape orientation to portrait for ease of reading.
          </p>
        </main>
      </div>
    );
  }

  function createTopics(data, topic) {
    const filteredData = data.filter((objects) => objects.topic === topic); // [{},{}]
    const topicData = filteredData.map((topic) => {
      return (
        <LO
          updateProgress={updateProgress}
          key={topic.id}
          learningObjective={topic.learning_objective}
        />
      );
    });

    return topicData;
  }

  function getLoadingComponent() {
    return <div className="loader" />;
  }

  function getSideNavBar() {
    return (
      <div className="sidenav">
        <>
          <style type="text/css">
            {`
                    .nav-navbar {
                      background-color: white;
                      margin-top: 15px;
                    }
                    a:link {
                      color: #e6530f;
                      background-color: transparent;
                      text-decoration: none;
                    }
                    a:active {
                      color: #e6530f;
                      background-color: transparent;
                      text-decoration: underline;
                    }
                    a:hover {
                      color: #e6530f;
                      background-color: transparent;
                      text-decoration: underline;
                    }
                    a:visited {
                      color: #e6530f;
                      background-color: transparent;
                      text-decoration: none;
                    }
                    `}
          </style>
          <Nav
            onSelect={(eventKey) => {
              document
                .getElementById(eventKey)
                .scrollIntoView({ behavior: "smooth" });
            }}
            fill
            variant="navbar"
            className="flex-column"
          >
            <Nav.Link href="#welcome" eventKey="welcome">
              Welcome
            </Nav.Link>
            <Nav.Link href="#HTML/CSS-topic" eventKey="HTML/CSS-topic">
              HTML/CSS
            </Nav.Link>
            <Nav.Link href="#Javascript-topic" eventKey="Javascript-topic">
              Javascript
            </Nav.Link>
            <Nav.Link href="#React-topic" eventKey="React-topic">
              React
            </Nav.Link>
            <Nav.Link href="#Git-topic" eventKey="Git-topic">
              Git
            </Nav.Link>
            <Nav.Link
              href="#How-the-Internet-works-topic"
              eventKey="How-the-Internet-works-topic"
            >
              How the Internet Works
            </Nav.Link>
          </Nav>
        </>
      </div>
    );
  }

  function getProgressBar(numberOfClickedLOs, numberOfLOs) {
    return (
      <ProgressBar
        display
        striped
        variant="warning"
        animated
        now={(numberOfClickedLOs / numberOfLOs) * 100}
        label={`${(numberOfClickedLOs / numberOfLOs) * 100}%`}
      />
    );
  }

  function getLocked() {
    return (
      <div>
        <img
          src="/locked.png"
          alt="locked-symbol"
          width="100"
          height="100"
        ></img>
      </div>
    );
  }

  function createTopicBlocks() {
    return null;
  }

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <div className="checklist-page">
        {getProgressBar(numberOfClickedLOs, numberOfLOs)}
        <div className="main-content">
          {getSideNavBar()}
          <div className="bulk-content">
            {getWelcomeMessage(props.cookies.email)}
            <div className="topics">
              <div id="HTML/CSS-topic">
                <h3 className="topic-title">HTML/CSS</h3>
                {data ? createTopics(data, "HTML/CSS") : getLoadingComponent()}
              </div>
              <div id="Javascript-topic">
                <h3 className="topic-title">Javascript</h3>
                {data ? createTopics(data, "Javascript") : null}
              </div>
              <div id="React-topic">
                <h3 className="topic-title">React</h3>
                {data ? createTopics(data, "React") : null}
              </div>
              <div id="Git-topic">
                <h3 className="topic-title">Git</h3>
                {getLoadingComponent()}
              </div>
              <div id="How-the-Internet-works-topic">
                <h3 className="topic-title">How the Internet Works</h3>
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    fill="orange"
                    className="bi bi-file-lock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224zM6.105 8.125A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3c0-.042.02-.107.105-.175z" />
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                  </svg>
                }
              </div>

              <div className="export-pdf-button">
                <>
                  <style type="text/css">
                    {`
                    .btn-pdf {
                      background-color: #d14420;
                      color: white;
                      margin-top: 30px;
                      margin-bottom: 30px;  
                    }
                    `}
                  </style>
                  <Button className="export-pdf-button" variant="pdf">
                    Save to PDF
                  </Button>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default StudentDashboard;
