import "./LO.css";
import React, { useEffect, useState } from "react";
import ConfidenceButton from "../ConfidenceButton/ConfidenceButton";
import Network from "../Networking";

function LO(props) {
  const [rating, setRating] = useState("");
  const [active, setActive] = useState("");

  const network = new Network();

  function updateRating(newRating) {
    console.log(newRating);
    if (newRating === rating) {
      setRating("white");
    } else {
      setRating(newRating);
    }
  }

  async function updateScore(score) {
    const newData = await network.postScore(
      props.userID,
      props.learningObjective,
      parseInt(score)
    );

    props.updateScore(newData);
  }

  function changeActive(text) {
    if (text === active) {
      setActive("");
    } else {
      setActive(text);
    }
  }

  function changeProgress(direction) {
    props.changeProgress(direction);
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
              changeProgress={(direction) => changeProgress(direction)}
              changeRating={updateRating}
              updateScore={(score) => updateScore(score)}
              type="red"
              text="Not confident"
              score="4"
              variant="outline-danger"
            />
          </div>
          <div className="neutral">
            <ConfidenceButton
              changeProgress={(direction) => changeProgress(direction)}
              changeRating={updateRating}
              type="amber"
              text="Needs revision"
              variant="outline-warning"
              score="3"
            />
          </div>
          <div className="confident">
            <ConfidenceButton
              changeProgress={(direction) => changeProgress(direction)}
              changeRating={updateRating}
              type="green"
              text="Feel confident"
              variant="outline-success"
              score="2"
            />
          </div>
        </div>
      </div>
    );
  }

  return <div className="LO">{createLO(rating, props.learningObjective)}</div>;
}

export default LO;
