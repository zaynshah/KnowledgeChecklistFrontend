import "./LO.css";
import React, { useEffect, useState } from "react";
import ConfidenceButton from "../ConfidenceButton/ConfidenceButton";

function LO(props) {
  const [rating, setRating] = useState("");

  function updateRating(rating) {
    setRating(rating);
  }

  function createDescription(rating, description) {
    if (rating === "red") {
      return (
        <div background-color="red" className="description">
          {description}
        </div>
      );
    } else if (rating === "amber") {
      return (
        <div background-color="amber" className="description">
          {description}
        </div>
      );
    } else if (rating === "green") {
      return (
        <div background-color="green" className="description">
          {description}
        </div>
      );
    } else {
      return (
        <div background-color="white" className="description">
          {description}
        </div>
      );
    }
  }

  function createLO(rating, description) {
    return (
      <div className="row">
        {createDescription(rating, description)}
        <div className="buttons">
          <div className="unconfident">
            <ConfidenceButton
              changeRating={updateRating}
              type="red"
              text="Not confident"
              variant="outline-danger"
            />
          </div>
          <div className="neutral">
            <ConfidenceButton
              changeRating={updateRating}
              type="amber"
              text="Needs revision"
              variant="outline-warning"
            />
          </div>
          <div className="confident">
            <ConfidenceButton
              changeRating={updateRating}
              type="green"
              text="Feel confident"
              variant="outline-success"
            />
          </div>
        </div>
      </div>
    );
  }

  return <div className="LO">{createLO(rating, props.learningObjective)}</div>;
}

export default LO;
