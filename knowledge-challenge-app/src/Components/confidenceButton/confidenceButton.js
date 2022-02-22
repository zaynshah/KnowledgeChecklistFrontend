import React from "react";
import Button from "react-bootstrap/Button";

function confidenceButton(props) {
  function handleSubmit(e) {
    props.changeRating(e.target.id);
  }

  function createButton(type, text) {
    return (
      <Button
        onClick={(e) => handleSubmit(e)}
        id={type}
        variant="primary"
        size="lg"
        active
      >
        {text}
      </Button>
    );
  }

  return <div className="mb-2">{createButton(props.type, props.text)}</div>;
}

export default confidenceButton;
