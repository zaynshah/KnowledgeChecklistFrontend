import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Network from "../Networking";
import { Redirect } from "react-router-dom";
// import { Typeahead } from "react-bootstrap-typeahead";

export default function AddLOModal(props) {
  const network = new Network();
  const [LO, setLO] = useState("");
  const [topic, setTopic] = useState("");
  const [getFullLo, setGetFullLo] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [selected, setSelected] = useState([]);

  async function handleClick(e) {
    e.preventDefault();
    const response = await network.postLO(props.info.cohortLOs[0].cohort_id, topic, LO);
    if (response === 200) {
      setLO("");
      setTopic("");
      props.uS(getFullLo);
    }
  }

  const options2 = [];
  function populateOption() {
    props.info.cohortLOs.forEach((i) => options2.push(i.topic));
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
              <Form.Group className="mb-3" controlId="topic">
                {/* <Typeahead
                  id="basic-example"
                  onChange={(sel) => {
                    setSelected({
                      Selected: sel[0],
                    });
                  }}
                  options={options2}
                  placeholder="Choose a topic..." */}

                {/* selected={selected} */}
                {/* /> */}
                <Form.Label>Topic</Form.Label>
                <Form.Control onChange={(e) => setTopic(e.target.value)} placeholder="Enter Topic" value={topic} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="LO">
                <Form.Label>Learning objective</Form.Label>
                <Form.Control type="text" onChange={(e) => setLO(e.target.value)} placeholder="Enter Learning Objective" value={LO} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={props.handleClose}>
              Close
            </Button>
            <Button onClick={handleClick} variant="dark" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
