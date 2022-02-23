import React from "react";
import Button from "react-bootstrap/Button";

function ConfidenceButton(props) {
  function handleSubmit(e) {
    props.changeRating(e.target.id);
  }

  function createButton(type, text) {
    return (
      <Button
        onClick={(e) => handleSubmit(e)}
        id={type}
        variant="outline-dark"
        size="lg"
        active
      >
        {text}
      </Button>
    );
  }

  return <div>{createButton(props.type, props.text)}</div>;
}

export default ConfidenceButton;
