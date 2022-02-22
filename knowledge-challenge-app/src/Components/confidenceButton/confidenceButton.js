import React from "react";
import Button from "react-bootstrap/Button";

function confidenceButton(props) {
  return (
    <div className="mb-2">
      <Button variant="primary" size="lg" active>
        {props.text}
      </Button>
    </div>
  );
}

export default confidenceButton;
