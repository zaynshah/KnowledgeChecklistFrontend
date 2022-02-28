import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router-dom";
import Header from "../Header";
import Network from "../Networking";

export default function ViewData(props) {
  const network = new Network();

  const [LO, setLO] = useState("");
  const [topic, setTopic] = useState("");
  const [fullCohortLOs, setFullCohortLOs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [userID, setUserID] = useState("");
  console.log(props);
  useEffect(() => {
    (async () => {
      setFullCohortLOs(await network.getAllTopicsPerCohort(props.location.state.cohortLOs[0].cohort_id));
    })();
  }, []);

  function handleClickData(e) {
    setUserID(e.target.value);
    setRedirect(true);
  }

  function createTopicList() {
    if (!fullCohortLOs) {
      return <h1>Loading...</h1>;
    }
    return fullCohortLOs.map((cohort, i) => (
      <div key={i}>
        <h5>{cohort.learning_objective}</h5>
      </div>
    ));
  }

  function createStudentList() {
    return props.location.state.students.map((student, i) => (
      <div key={i}>
        <label>
          {student.email}
          <button value={student.user_id} onClick={(e) => handleClickData(e)}>
            View Data!
          </button>
        </label>
      </div>
    ));
  }

  async function handleClick(e) {
    e.preventDefault();
    const response = await network.postLO(props.location.state.cohortLOs[0].cohort_id, topic, LO);
    if (response === 200) {
      console.log(response);
      setFullCohortLOs(await network.getAllTopicsPerCohort(props.location.state.cohortLOs[0].cohort_id));
      setLO("");
      setTopic("");
    }
  }

  function insertLO() {
    return (
      <Form>
        <Form.Group className="mb-3 mt-4">
          <Form.Control onChange={(e) => setTopic(e.target.value)} placeholder="Enter Topic" value={topic} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control onChange={(e) => setLO(e.target.value)} placeholder="Enter Learning Objective" value={LO} />
        </Form.Group>
        <Button onClick={async (e) => handleClick(e)} variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    );
  }

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <Container className="py-4 m-5 p-5">
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
            <h2 className="mb-4">
              Welcome to <u>Cohort {props.location.state.cohortLOs[0].cohort_id}</u> learning objectives:
            </h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-123" viewBox="0 0 16 16">
              <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
            </svg>
            {createTopicList()}
            {createStudentList()}
          </>
        )}
        <h3 className="mt-4">Enter a new learning objective below:</h3>
        {insertLO()}
      </Container>
    </>
  );
}
