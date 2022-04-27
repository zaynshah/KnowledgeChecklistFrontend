import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Network from "../Networking";
import AddLOModal from "./AddLOModal";
import EditLOModal from "./EditLOModal";

export default function ViewData(props) {
  const network = new Network();
  const [fullCohortLOs, setFullCohortLOs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [userID, setUserID] = useState("");
  const [showAddLO, setShowAddLO] = useState(false);
  const [showEditLO, setShowEditLO] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [uniqueTopics, setUniqueTopics] = useState([]);
  const [editTopic, setEditTopic] = useState([]);
  const [editLO, setEditLO] = useState([]);
  const [editConfident, setEditConfident] = useState([]);
  const [editNotConfident, setEditNotConfident] = useState([]);

  const handleShowAddLO = () => {
    setShowAddLO(!showAddLO);
  };

  useEffect(() => {
    (async () => {
      setFullCohortLOs(await network.getAllTopicsPerCohort(props.location.state.cohortLOs[0].cohort_id));
      setUniqueTopics(await network.getAllUniqueCohortTopics(props.location.state.cohortLOs[0].cohort_id));
    })();
  }, []);

  function handleShowEditLO(e) {
    setShowEditLO(!showEditLO);
  }

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

    return fullCohortLOs.map((cohort) => (
      <div key={Math.random()}>
        <p className="fs-5 m-0">
          <strong>{cohort.topic}</strong>: {cohort.learning_objective}
          <Button
            value={cohort.topic}
            onClick={(e) => {
              setEditTopic(cohort.topic);
              setEditLO(cohort.learning_objective);
              setEditConfident(cohort.confident);
              setEditNotConfident(cohort.not_confident);
              setShowEditLO(!showEditLO);
            }}
            variant="outline-dark"
            className="ms-2"
            size="sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e7530b" class="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </Button>
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
      <EditLOModal
        uS={updateState}
        show={showEditLO}
        handleClose={handleShowEditLO}
        selectedTopic={editTopic}
        selectedLO={editLO}
        selectedConfident={editConfident}
        selectedNotConfident={editNotConfident}
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
                Welcome to <u>Cohort {props.location.state.cohortLOs[0].cohort_id}</u> learning objectives:
              </Card.Header>
              <Card.Body style={{ height: "70vh", overflow: "scroll" }}>
                <Card.Text>
                  {createTopicList()}
                  <Button className="mt-4" onClick={handleShowAddLO} variant="dark">
                    Enter a new learning objective
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Header as="h2">
                <u>Cohort {props.location.state.cohortLOs[0].cohort_id}:</u> Results summary
              </Card.Header>
              <Card.Body>
                <Button variant="outline-dark">Cohort results</Button>
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
