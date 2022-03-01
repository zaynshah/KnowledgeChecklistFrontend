import "./LO.css";
import React, { useEffect, useState } from "react";
import ConfidenceButton from "../ConfidenceButton/ConfidenceButton";
import Network from "../Networking";
import { radios } from "./radios";

function LO(props) {
  const network = new Network();
  const radioButtons = radios;

  async function updateScore(newScore) {
    const hasUpdated = newScore !== props.score;
    const progress = hasUpdated ? "increase" : "decrease";
    props.updateProgress(progress);
    const updatedScore = props.isActive && !hasUpdated ? 1 : newScore;

    console.log(props.score);

    const newData = await network.postScore(
      props.userID,
      props.learningObjective,
      updatedScore,
      hasUpdated ? !props.isActive : props.isActive
    );

    console.log(newData);

    await props.updateScore(newData);
  }

  function createLO(score, description) {
    return (
      <div className="row">
        <div className={`description description-background-${score}`}>
          {description}
        </div>

        <div className="buttons">
          {radios.map((button) => {
            return (
              <ConfidenceButton
                updateScore={(newScore) => updateScore(newScore)}
                text={button.text}
                score={button.score}
                variant={button.variant}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="LO">{createLO(props.score, props.learningObjective)}</div>
  );
}

export default LO;
