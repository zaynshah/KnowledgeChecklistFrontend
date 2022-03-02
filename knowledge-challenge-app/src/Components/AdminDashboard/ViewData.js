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
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [uniqueTopics, setUniqueTopics] = useState([]);

  const handleShowAddLO = () => {
    setShowAddLO(!showAddLO);
  };

  useEffect(() => {
    (async () => {
      setFullCohortLOs(await network.getAllTopicsPerCohort(props.location.state.cohortLOs[0].cohort_id));
      setUniqueTopics(await network.getAllUniqueCohortTopics(props.location.state.cohortLOs[0].cohort_id));
    })();
  }, []);

  function handleClickData(e) {
    setUserID(e.target.value);
    setRedirect(true);
  }

  async function handleDelete(e, deleteLo, c) {
    e.preventDefault();

    const response = await network.deleteLOS(deleteLo, c);
    if (response === 200) {
      setDeleteSuccess(!deleteSuccess);
      setFullCohortLOs(await network.getAllTopicsPerCohort(props.location.state.cohortLOs[0].cohort_id));
    }
  }

  function createTopicList() {
    if (!fullCohortLOs) {
      return <p>Loading...</p>;
    }
    return fullCohortLOs.map((cohort, i) => (
      <div key={Math.random()}>
        <p className="fs-5 m-0">
          <strong>{cohort.topic}</strong>: {cohort.learning_objective}
          <Button variant="outline-dark" className="ms-2" size="sm" onClick={(e) => handleDelete(e, cohort.learning_objective, cohort.cohort_id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e7530b" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Button>
        </p>
      </div>
    ));
  }

  function createStudentList() {
    if (props.location.state.students.length === 0) {
      return <p className="fs-5">No students are currently enrolled on this course.</p>;
    } else {
      return props.location.state.students.map((student, i) => (
        <div key={i}>
          <label>
            <span className="fs-5">
              {student.email}{" "}
              <Button value={student.user_id} onClick={(e) => handleClickData(e)} variant="outline-dark" className="mt-1">
                View data
              </Button>
            </span>
          </label>
        </div>
      ));
    }
  }

  async function updateState(a) {
    if (!a) {
      setFullCohortLOs(await network.getAllTopicsPerCohort(props.location.state.cohortLOs[0].cohort_id));
    }
  }

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <AddLOModal uS={updateState} info={props.location.state} show={showAddLO} handleClose={handleShowAddLO} cohortTopic={uniqueTopics} />
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
                Welcome to <u>Cohort {props.location.state.cohortLOs[0].cohort_id}</u> learning objectives:
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {createTopicList()}
                  <Button className="mt-4" onClick={handleShowAddLO} variant="dark">
                    Enter a new learning objective
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Header as="h2">Students enrolled:</Card.Header>
              <Card.Body>{createStudentList()}</Card.Body>
            </Card>
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}
