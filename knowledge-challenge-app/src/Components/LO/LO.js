import "./LO.css";
import React, { useEffect, useState } from "react";
import ConfidenceButton from "../ConfidenceButton/ConfidenceButton";

function LO(props) {
  const [rating, setRating] = useState("");

  function updateRating(rating) {
    setRating(rating);
  }

  function createLO(description) {
    return (
      <div className="LO">
        <div>{description}</div>
        <div className="unconfident">
          <ConfidenceButton
            changeRating={updateRating}
            type="red"
            text="Not confident"
          />
        </div>
        <div className="neutral">
          <ConfidenceButton
            changeRating={updateRating}
            type="amber"
            text="Needs revision"
          />
        </div>
        <div className="confident">
          <ConfidenceButton
            changeRating={updateRating}
            type="green"
            text="Feel confident"
          />
        </div>
      </div>
    );
  }

  return <div>{createLO(props.learningObjective)}</div>;
}

export default LO;

// function createDescription(rating, description) {
//   if (rating === "red") {
//     return <div color="red">{description}</div>;
//   } else if (rating === "amber") {
//     return <div color="amber">{description}</div>;
//   } else if (rating === "green") {
//     return <div color="green">{description}</div>;
//   } else {
//     return <div color="white">{description}</div>;
//   }
// }
