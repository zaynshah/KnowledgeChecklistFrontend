import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Network from "../Networking";
import { Redirect } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import Alert from "react-bootstrap/Alert";
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function AddLOModal(props) {
  const network = new Network();
  const [LO, setLO] = useState("");
  const [confident, setConfident] = useState("");
  const [notConfident, setNotConfident] = useState("");
  const [getFullLo] = useState("");
  const [redirect] = useState(false);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  async function handleClick(e) {
    e.preventDefault();
    console.log(LO, confident, notConfident);
    let addTopic = "";
    selected[0].length ? (addTopic = selected[0]) : (addTopic = selected[0].label);
    try {
      const response = await network.postLO(props.info.cohortLOs[0].cohort_id, addTopic, LO, notConfident, confident);
      console.log(response);
      const json = await response.json();
      console.log(json);
      if (response.status >= 400) {
        throw new Error(json.error);
      } else {
        setLO("");
        setSelected([]);
        setError("");
        setConfident("");
        setNotConfident("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        setDisableButton(true);
        props.uS(getFullLo);
      }
    } catch (error) {
      setSuccess(false);
      setError(error.toString());
    }
  }

  const options2 = [];
  function populateOption() {
    props.cohortTopic.forEach((i) => options2.push(i.topic));
  }
  populateOption();

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
              <Form.Group className="mb-3 is-invalid" controlId="topic">
                <Form.Label>Topic</Form.Label>
                <Typeahead
                  allowNew
                  inputProps={{
                    className: disableButton ? "is-invalid" : "is-valid",
                  }}
                  id="basic-example"
                  onChange={(selected) => {
                    setSelected(selected);
                    setDisableButton(!disableButton);
                  }}
                  options={options2}
                  placeholder="Choose a topic..."
                  selected={selected}
                  value={LO}
                />
                <Form.Text className="text-muted">you must select or create a new topic </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="LO">
                <Form.Label></Form.Label>
                Learning objective
                <Form.Control type="text" onChange={(e) => setLO(e.target.value)} placeholder="Enter Learning Objective" value={LO} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="not-confident">
                <Form.Label>Not confident resource</Form.Label>
                <Form.Control type="text" onChange={(e) => setNotConfident(e.target.value)} placeholder="Enter URL" value={notConfident} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confident">
                <Form.Label>Confident quiz resource</Form.Label>
                <Form.Control type="text" onChange={(e) => setConfident(e.target.value)} placeholder="Enter URL" value={confident} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {error ? (
              <Alert className="alert alert-danger" role="alert">
                {error}
              </Alert>
            ) : null}
            {success ? (
              <Alert className="alert alert-success" role="alert">
                Added successfully!
              </Alert>
            ) : null}
            <Button variant="outline-dark" onClick={props.handleClose}>
              Close
            </Button>
            <Button onClick={handleClick} variant="dark" type="submit" disabled={disableButton}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
