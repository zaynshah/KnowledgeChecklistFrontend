import "bootstrap/dist/css/bootstrap.min.css";
import "./StudentDashboard.css";
import React, { useEffect, useState } from "react";
import Network from "../Networking";
import Header from "../Header";
import LO from "../LO/LO";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer";

function StudentDashboard(props) {
  const [data, setData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [numberOfLOs, setNumberOfLOs] = useState(0);
  const [numberOfClickedLOs, setNumberOfClickedLOs] = useState(0);
  const [showDarkMode, setShowDarkMode] = useState("");

  const network = new Network();

  useEffect(() => {
    (async () => {
      try {
        document.title = props.cookies.email ? `${props.cookies.email.split("@")[0]}'s Knowledge Checklist` : "Knowledge Checklist";

        const firstLoadData = await updateScore();
        setNumberOfLOs(firstLoadData.length);

        const ClickedLOs = firstLoadData.filter((objects) => objects.score !== 1);
        setNumberOfClickedLOs(ClickedLOs.length);

        setShowDarkMode(firstLoadData[0].dark_mode);

        const uniqueTopics = await network.getAllTopicsOnlyPerStudent(props.cookies.userID);
        setTopics(uniqueTopics);
      } catch (e) {}
    })();
  }, []);

  async function updateScore() {
    const data = await network.getAllTopicsPerStudent(props.cookies.userID);
    setData(data);
    return data;
  }

  async function vueDarkMode(e) {
    const response = await network.postDark(!showDarkMode, props.cookies.userID);

    if (response == 200) {
      const aa = await updateScore();
      setShowDarkMode(aa[0].dark_mode);
    }
  }

  function getWelcomeMessage() {
    const id = props.cookies ? props.cookies.email.split("@")[0] : "User";
    return (
      <>
        <div>
          {" "}
          <Form.Group className="p-3" controlId="cohort-id">
            <Form.Check
              className={showDarkMode ? "dark-heading" : ""}
              type="switch"
              id="custom-switch"
              label="Dark Mode"
              onChange={vueDarkMode}
              checked={showDarkMode ? true : false}
            />
          </Form.Group>
        </div>
        <div className="welcome-flex">
          <Card className={showDarkMode ? "m-3 card-dark row" : "m-3 row"} style={{ width: "80rem" }}>
            <Card.Header className={showDarkMode ? "header-border" : ""} style={{ fontSize: 20 }}>
              <strong>
                Welcome, {id}! <br /> How to use this checklist:
              </strong>
            </Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text as="div">
                Select your level of confidence with the buttons next to each statement. Choosing <span className="red">'not confident'</span> will
                colour the statement red. Choosing <span className="yellow">'needs revision'</span> will colour the statement yellow. Finally,
                choosing <span className="green">'feel confident'</span> will colour the statement green. Essentially:
                <ul>
                  <li>
                    <strong>
                      <span className="red">Red</span>
                    </strong>{" "}
                    topics are those you don't understand well.
                  </li>
                  <li>
                    <strong>
                      <span className="yellow">Yellow</span>
                    </strong>{" "}
                    topics are those that still need work.{" "}
                  </li>
                  <li>
                    <strong>
                      <span className="green">Green</span>
                    </strong>{" "}
                    topics are the ones you feel most confident with.
                  </li>
                </ul>{" "}
                At the bottom of the page, there is a button to print / save your progress. This will allow you to save a PDF or print a version of
                the page with the selections you have made. Additionally, you may prefer landscape orientation to portrait for ease of reading.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }

  function createTopics(data) {
    if (!data) {
      return <h3>Loading.. </h3>;
    }
    console.log(topics);
    const topicCards = topics.map((item, i) => {
      return (
        <Card key={item.topic} id={`${item.topic}`} className={showDarkMode ? `m-3 ${item.topic} card-dark` : `m-3 ${item.topic}`}>
          <Card.Header className={showDarkMode ? "header-border" : ""} r>
            <strong>{item.topic}</strong>
          </Card.Header>
          <Card.Body>
            <Card.Text as="div">{data ? createLOs(data, item.topic) : getLoadingComponent()}</Card.Text>
          </Card.Body>
        </Card>
      );
    });
    return topicCards;
  }

  async function updateState(a) {
    if (!a) {
      const firstLoadData = await updateScore();
      setNumberOfLOs(await firstLoadData.length);
      const ClickedLOs = firstLoadData.filter((objects) => objects.score !== 1);
      setNumberOfClickedLOs(await ClickedLOs.length);
    }
  }
  function createLOs(data, topic) {
    const filteredLOs = data.filter((topicList) => topicList.topic === topic);

    const topicData = filteredLOs.map((topic) => {
      return (
        <LO
          darkMode={showDarkMode}
          resource={[topic.confident, topic.not_confident]}
          key={topic.id}
          learningObjective={topic.learning_objective}
          score={topic.score}
          userID={props.cookies.userID}
          updateScore={(newData) => updateScore(newData)}
          uS={updateState}
          isActive={1}
        />
      );
    });

    return topicData;
  }

  function getLoadingComponent() {
    return <div className="loader" />;
  }

  function getSideNavBar(topicList) {
    return (
      <div className={showDarkMode ? "sidenav-dark" : "sidenav"}>
        <>
          <style type="text/css">
            {`
                    .nav-navbar {
                      background-color: ${showDarkMode ? "rgba(68, 87, 96, 1)" : "white"};
                      
                      margin-top: 15px;
                    }
                    a:link {
                      color: ${showDarkMode ? "white" : "black"};
                      background-color: transparent;
                      text-decoration: none;
                      transition-delay: 0s;
                    }
                    a:active {
                      color: ${showDarkMode ? "white" : "black"};
                      background-color: transparent;
                      text-decoration: underline;
                      transition-delay: 0s;
                    }
                    a:visited:hover {
                      color: #e6530f;
                      background-color: transparent;
                      text-decoration: underline;
                      transition-delay: 0s;
                    }
                    a:visited {
                      color:${showDarkMode ? "white" : "black"};
                      background-color: transparent;
                      text-decoration: none;
                      transition-delay: 0s;
                    }
                    `}
          </style>
          <Nav
            data-testid="navBar"
            onSelect={(e) => {
              document.getElementById(e);
            }}
            fill
            variant="navbar"
            className="flex-column"
          >
            <Nav.Link data-testid="welcome-button" href="#welcome" eventKey="welcome">
              Welcome
            </Nav.Link>
            {topicList.map((item) => {
              return (
                <Nav.Link data-testid={`${item.topic}-button`} key={item.topic} href={`#${item.topic}`} eventKey={`${item.topic}`}>
                  {item.topic}
                </Nav.Link>
              );
            })}
          </Nav>
        </>
      </div>
    );
  }

  function progressBarColor(numberOfClickedLOs, numberOfLOs) {
    if (numberOfClickedLOs / numberOfLOs <= 0.25) {
      return "danger";
    } else if (numberOfClickedLOs / numberOfLOs <= 0.5) {
      return "warning";
    } else {
      return "success";
    }
  }

  function getProgressBar(numberOfClickedLOs, numberOfLOs) {
    return (
      <ProgressBar
        data-testid="progressBar"
        striped
        variant={progressBarColor(numberOfClickedLOs, numberOfLOs)}
        animated
        now={Math.round((numberOfClickedLOs / numberOfLOs) * 100)}
        label={Math.round((numberOfClickedLOs / numberOfLOs) * 100) + `%`}
      />
    );
  }

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} darkMode={showDarkMode} />
      <div className={"checklist-page"}>
        {getProgressBar(numberOfClickedLOs, numberOfLOs)}

        <div className={showDarkMode ? "main-content-dark" : "main-content"}>
          {topics ? getSideNavBar(topics) : getLoadingComponent()}
          <div className={showDarkMode ? "bulk-content-dark" : "bulk-content"}>
            <div data-testid="welcome" id="welcome" className="topics">
              {getWelcomeMessage(props.cookies.email.split("@")[0])}
            </div>

            <div className="topics">{data ? createTopics(data) : getLoadingComponent()}</div>

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
                <Button
                  data-testid="pdfButton"
                  className="export-pdf-button"
                  variant="pdf"
                  onClick={() => {
                    window.print();
                  }}
                >
                  Save to PDF
                </Button>
              </>
            </div>
            <Footer className="student-footer" />
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
