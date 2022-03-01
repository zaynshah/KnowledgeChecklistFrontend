import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";

function ConfidenceButton(props) {
  function handleSubmit(e) {
    props.updateScore(parseInt(e.target.id));
  }

  function createButton(score, text, variant) {
    return (
      <Button onClick={(e) => handleSubmit(e)} id={score} variant={variant}>
        {text}
      </Button>
    );
  }

  return <div>{createButton(props.score, props.text, props.variant)}</div>;
}

export default ConfidenceButton;
