import "./LO.css";
import React, { useEffect, useState } from "react";
import ConfidenceButton from "../ConfidenceButton/ConfidenceButton";

function LO(props) {
  const [rating, setRating] = useState("");

  function updateRating(newRating) {
    console.log(newRating);
    setRating(newRating);
  }

  function updateProgress() {
    props.updateProgress();
  }

  function createLO(rating, description) {
    return (
      <div className="row">
        <div className={`description description-background-${rating}`}>
          {description}
        </div>

        <div className="buttons">
          <div className="unconfident">
            <ConfidenceButton
              changeProgress={updateProgress}
              changeRating={updateRating}
              type="red"
              text="Not confident"
              variant="outline-danger"
            />
          </div>
          <div className="neutral">
            <ConfidenceButton
              changeProgress={updateProgress}
              changeRating={updateRating}
              type="amber"
              text="Needs revision"
              variant="outline-warning"
            />
          </div>
          <div className="confident">
            <ConfidenceButton
              changeProgress={updateProgress}
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
