import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Network from "../Networking";
import AddLOModal from "./AddLOModal";

export default function ViewData(props) {
  const network = new Network();
  const [fullCohortLOs, setFullCohortLOs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [userID, setUserID] = useState("");
  const [showAddLO, setShowAddLO] = useState(false);

  const handleShowAddLO = () => {
    setShowAddLO(!showAddLO);
  };

  useEffect(() => {
    (async () => {
      setFullCohortLOs(
        await network.getAllTopicsPerCohort(
          props.location.state.cohortLOs[0].cohort_id
        )
      );
    })();
  }, []);

  function handleClickData(e) {
    setUserID(e.target.value);
    setRedirect(true);
  }

  function createTopicList() {
    if (!fullCohortLOs) {
      return <p>Loading...</p>;
    }
    return fullCohortLOs.map((cohort, i) => (
      <div key={i}>
        <p className="fs-5 m-0">
          <strong>{cohort.topic}</strong>: {cohort.learning_objective}
        </p>
      </div>
    ));
  }

  function createStudentList() {
    if (props.location.state.students.length === 0) {
      return (
        <p className="fs-5">
          No students are currently enrolled on this course.
        </p>
      );
    } else {
      return props.location.state.students.map((student, i) => (
        <div key={i}>
          <label>
            <p className="fs-5">
              {student.email}{" "}
              <Button
                value={student.user_id}
                onClick={(e) => handleClickData(e)}
                variant="dark"
              >
                View data
              </Button>
            </p>
          </label>
        </div>
      ));
    }
  }

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <AddLOModal
        info={props.location.state}
        show={showAddLO}
        handleClose={handleShowAddLO}
      />
      <Container className="py-4 mt-3 p-5">
        {!props.isLog ? (
          <Redirect to="/" />
        ) : redirect ? (
          <Redirect
            push
            to={{
              pathname: "/data",
              state: { userID },
            }}
          />
        ) : (
          <>
            <Card>
              <Card.Header as="h2">
                Welcome to{" "}
                <u>Cohort {props.location.state.cohortLOs[0].cohort_id}</u>{" "}
                learning objectives:
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-123"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                  </svg>
                  {createTopicList()}
                  <Button
                    className="mt-4"
                    onClick={handleShowAddLO}
                    variant="dark"
                  >
                    Enter a new learning objective
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Header as="h2">Students on this cohort:</Card.Header>
              <Card.Body>{createStudentList()}</Card.Body>
            </Card>
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}
