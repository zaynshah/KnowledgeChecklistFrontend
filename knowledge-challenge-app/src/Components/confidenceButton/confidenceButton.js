import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";

function ConfidenceButton(props) {
  function handleSubmit(e) {
    props.changeRating(e.target.id);
  }

  function createButton(type, text, variant) {
    return (
      <Button onClick={(e) => handleSubmit(e)} id={type} variant={variant}>
        {text}
      </Button>
    );
  }

  return <div>{createButton(props.type, props.text, props.variant)}</div>;
}

export default ConfidenceButton;
