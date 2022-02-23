import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentDashboard.css";
import React, { useEffect, useState } from "react";
import Network from "../Networking";
import Header from "../Header";
import LO from "../LO/LO";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import ProgressBar from "react-bootstrap/ProgressBar";

function StudentDashboard(props) {
  const [data, setData] = useState([]);
  const [completion, setCompletion] = useState(10);
  const network = new Network();

  document.title = `${props.studentName}'s Knowledge Checklist`;

  useEffect(() => {
    (async () => {
      setData(await network.getAllTopics(1));
    })();
  }, []);

  function getWelcomeMessage() {
    return (
      <div className="welcome">
        <h1>Welcome, {props.studentName}. </h1>
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
    console.log(filteredData);

    const topicData = filteredData.map((topic) => {
      return <LO key={topic.id} learningObjective={topic.learning_objective} />;
    });

    return topicData;
  }

  function getLoadingComponent() {
    return <div className="loader" />;
  }

  function handlePDFClick() {
    const element = document.getElementById("review-page");
    // html2pdf(element);
  }

  function getSideNavBar() {
    return (
      <div className="sidenav">
        <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
          <Nav.Link eventKey="">HTML/CSS</Nav.Link>
          <Nav.Link eventKey="link-1">Javascript</Nav.Link>
          <Nav.Link eventKey="link-2">React</Nav.Link>
        </Nav>
      </div>
    );
  }

  function getProgressBar(completion) {
    return <ProgressBar striped variant="warning" animated now={completion} />;
  }

  return (
    <>
      <Header logOut={props.logOut} />
      <div className="review-page">
        {getProgressBar(completion)}
        {getWelcomeMessage()}

        <div className="bulk-content">
          {getSideNavBar()}
          <div className="topics">
            <main>
              <h3>HTML/CSS</h3>
              {data ? createTopics(data, "HTML/CSS") : null}
            </main>
            <main>
              <h3>Javascript</h3>
              {data ? createTopics(data, "Javascript") : null}
            </main>
            <main>
              <h3>React</h3>
              {data ? createTopics(data, "React") : null}
            </main>
            <main>
              <h3>Git</h3>
              {data ? createTopics(data, "Git") : null}
            </main>
            <div className="export-pdf-button">
              <Button
                className="export-pdf-button"
                variant="outline-primary"
                onClick={handlePDFClick}
              >
                Save to PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
