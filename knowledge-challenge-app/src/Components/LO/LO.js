import React, { useEffect, useState } from "react";
import confidenceButton from "../confidenceButton/confidenceButton";

function LO(props) {
  const [rating, setRating] = useState("");

  function changeRating(type) {
    setRating(type);
  }

  useEffect(() => {});

  function createDescription(rating, description) {
    if (rating === "red") {
      return <div color="red">{description}</div>;
    } else if (rating === "amber") {
      return <div color="amber">{description}</div>;
    } else if (rating === "green") {
      return <div color="green">{description}</div>;
    } else {
      return <div color="white">{description}</div>;
    }
  }

  function createLO(rating, description) {
    return (
      <div>
        <div className="LO">{createDescription(rating, description)}</div>
        <div className="LO">
          <confidenceButton
            changeRating={changeRating}
            type="red"
            text="Not confident"
          />
          <confidenceButton
            changeRating={changeRating}
            type="amber"
            text="Needs revision"
          />
          <confidenceButton
            changeRating={changeRating}
            type="green"
            text="Feel confident"
          />
        </div>
      </div>
    );
  }

  return <div>{createLO(rating, props.descriptionOfLO)}</div>;
}

export default LO;
