import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function ConfidenceButton(props) {
  const [isActive, setIsActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function handleSubmit(e) {
    props.changeRating(e.target.id);

    if (isActive) {
      props.changeProgress("decrease");
    } else {
      props.changeProgress("increase");
    }

    props.updateScore(props.score);

    if (!isActive) {
      console.log(props.text + " - Making active");
      setIsActive(true);
    } else {
      console.log(props.text + " - Making inactive");
      setIsActive(false);
    }
  }

  function changeButton() {
    return (
      <div className="export-pdf-button">
        <>
          <style type="text/css">
            {`
                    .btn-pdf {
                      background-color: #d14420;
                      color: white;
                      margin-top: 30px;
                      margin-bottom: 30px;  
                    }
                    `}
          </style>
          <Button className="export-pdf-button" variant="pdf">
            Save to PDF
          </Button>
        </>{" "}
      </div>
    );
  }

  function createButton(type, text, variant, isClicked) {
    if (isClicked) {
      return (
        <Button onClick={(e) => handleSubmit(e)} id={type} variant={variant}>
          I'm clicked
        </Button>
      );
    } else {
      return (
        <Button onClick={(e) => handleSubmit(e)} id={type} variant={variant}>
          {text}
        </Button>
      );
    }
  }

  return <div>{createButton(props.type, props.text, props.variant)}</div>;
}

export default ConfidenceButton;
