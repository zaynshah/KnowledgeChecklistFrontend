import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Network from "../Networking";
import Alert from "react-bootstrap/Alert";

export default function EditLOModal(props) {
  const network = new Network();

  const [newLO, setNewLO] = useState(false);
  const [confident, setConfident] = useState(false);
  const [notConfident, setNotConfident] = useState(false);
  const [showEditLO, setShowEditLO] = useState(false);
  const [getFullLo] = useState("");
  const [error, setError] = useState("");

  async function handleClick(e) {
    e.preventDefault();

    try {
      const response = await network.postNewLO(
        newLO ? newLO : props.selectedLO,
        notConfident ? notConfident : props.selectedNotConfident,
        confident ? confident : props.selectedConfident,
        props.selectedLO
      );
      const json = await response.json();
      if (response.status >= 400) {
        throw new Error(json.error);
      } else {
        props.uS(getFullLo);
        setNewLO(false);
        setConfident(false);
        setNotConfident(false);
        props.handleClose();
      }
    } catch (error) {
      setError(error.toString());
    }
  }
  function handleShowEditLO(e) {
    setShowEditLO(!showEditLO);
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add learning objective for this cohort</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group className="mb-3 is-invalid" controlId="topic">
              <Form.Label>Topic</Form.Label>
              <Form.Control type="text" disabled={true} value={props.selectedTopic} />
              <Form.Text className="text-muted">you cannot edit the topic - delete instead </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="LO">
              <Form.Label></Form.Label>
              Learning objective
              <Form.Control
                type="text"
                onChange={(e) => {
                  setNewLO(e.target.value);
                  console.log(newLO);
                }}
                value={newLO === false ? props.selectedLO : newLO}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="not-confident">
              <Form.Label>Not confident resource</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setNotConfident(e.target.value);
                }}
                placeholder={props.selectedNotConfident !== "." ? props.selectedNotConfident : "Enter a URL"}
                value={notConfident === false ? "" : notConfident}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confident">
              <Form.Label>Confident quiz resource</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setConfident(e.target.value);
                }}
                placeholder={props.selectedConfident !== "." ? props.selectedConfident : "Enter a URL"}
                value={confident === false ? "" : confident}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {error ? (
            <Alert className="alert alert-danger" role="alert">
              {error}
            </Alert>
          ) : null}
          <Button
            variant="outline-dark"
            onClick={(e) => {
              setNewLO(false);
              setConfident(false);
              setNotConfident(false);
              props.handleClose();
            }}
          >
            Reset & Close
          </Button>
          <Button
            onClick={(e) => {
              handleClick(e);
            }}
            variant="dark"
            type="submit"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
