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

  useEffect(() => {
    (async () => {
      setFullCohortLOs(
        await network.getAllTopicsPerCohort(
          props.location.state.cohortLOs[0].cohort_id
        )
      );
    })();
  }, []);

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

  async function handleClick(e) {
    e.preventDefault();
    console.log(LO);
    console.log(topic);
    console.log(props.location.state.cohortLOs[0].cohort_id);
    await network.postLO(
      props.location.state.cohortLOs[0].cohort_id,
      topic,
      LO
    );
    setFullCohortLOs(
      await network.getAllTopicsPerCohort(props.location.state.cohortLOs[0])
    );
    setLO("");
    setTopic("");
  }

  function insertLO() {
    return (
      <Form>
        <Form.Group className="mb-3 mt-4">
          <Form.Control
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter Topic"
            value={topic}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={(e) => setLO(e.target.value)}
            placeholder="Enter Learning Objective"
            value={LO}
          />
        </Form.Group>
        <Button
          onClick={async (e) => handleClick(e)}
          variant="dark"
          type="submit"
        >
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
        ) : (
          <>
            <h2 className="mb-4">
              Welcome to{" "}
              <u>Cohort {props.location.state.cohortLOs[0].cohort_id}</u>{" "}
              learning objectives:
            </h2>
            {createTopicList()}
          </>
        )}
        <h3 className="mt-4">Enter a new learning objective below:</h3>
        {insertLO()}
      </Container>
    </>
  );
}
