import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Network from "../Networking";
import { Redirect } from "react-router-dom";

export default function AddLOModal(props) {
  const network = new Network();
  const [LO, setLO] = useState("");
  const [topic, setTopic] = useState("");
  const [fullCohortLOs, setFullCohortLOs] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function handleClick(e) {
    e.preventDefault();

    const response = await network.postLO(
      props.info.cohortLOs[0].cohort_id,
      topic,
      LO
    );
    console.log(response);
    if (response === 200) {
      setFullCohortLOs(
        await network.getAllTopicsPerCohort(props.info.cohortLOs[0].cohort_id)
      );
      setLO("");
      setTopic("");
      setRedirect(true);
    }
  }

  return (
    <>
      {redirect ? (
        <Redirect
          push
          to={{
            pathname: "/cohorts",
            state: {
              cohortLOs: props.info.cohortLOs,
              cohorts: props.info.cohorts,
              students: props.info.students,
            },
          }}
        />
      ) : (
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add learning objective for this cohort</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate>
              <Form.Group className="mb-3" controlId="topic">
                <Form.Label>Topic</Form.Label>
                <Form.Control
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter Topic"
                  value={topic}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="LO">
                <Form.Label>Learning objective</Form.Label>
                <Form.Control
                  onChange={(e) => setLO(e.target.value)}
                  placeholder="Enter Learning Objective"
                  value={LO}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={props.handleClose}>
              Close
            </Button>
            <Button
              onClick={async (e) => handleClick(e)}
              variant="dark"
              type="submit"
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
