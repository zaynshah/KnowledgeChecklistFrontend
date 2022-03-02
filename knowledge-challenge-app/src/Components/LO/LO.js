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

    const newData = await network.postScore(props.userID, props.learningObjective, updatedScore, hasUpdated ? !props.isActive : props.isActive);
    await props.updateScore(newData);
  }

  function createLO(score, description) {
    return (
      <>
        <div className="row">
          <div
            className={
              props.darkMode
                ? `description description-background-${score == 1 ? "dark-back" : score}`
                : `description description-background-${score}`
            }
          >
            {description}
          </div>

          <div className="buttons">
            {radios.map((button) => {
              return (
                <ConfidenceButton
                  key={button.id}
                  updateScore={(newScore) => updateScore(newScore)}
                  text={button.text}
                  score={button.score}
                  variant={props.darkMode ? button.variant[1] : button.variant[0]}
                  style={{ "transition-delay": "0s" }}
                />
              );
            })}
          </div>
        </div>
        {score == 2 ? (
          props.resource[0] != "." ? (
            <div className="feedback">
              Well done, test your knowledge with this
              <a href={props.resource[0]} target="_blank">
                {" "}
                quiz
              </a>
            </div>
          ) : (
            <div className="feedback">Well done! you are becoming a pro software developer</div>
          )
        ) : (
          <></>
        )}
        {score == 3 ? (
          props.resource[1] != "." ? (
            <div className="feedback">
              Nearly there, try this
              <a href={props.resource[1]} target="_blank">
                {" "}
                resource
              </a>{" "}
              and become a wizard!
            </div>
          ) : (
            <div className="feedback">Nearly there, keep practising!</div>
          )
        ) : (
          <></>
        )}
        {score == 4 ? (
          props.resource[1] != "." ? (
            <div className="feedback">
              Don't worry, try this
              <a href={props.resource[1]} target="_blank">
                {" "}
                resource
              </a>{" "}
              and become a pro!
            </div>
          ) : (
            <div className="feedback">Needs attention, recap and come back!</div>
          )
        ) : (
          <></>
        )}
      </>
    );
  }

  return <div className="LO">{createLO(props.score, props.learningObjective)}</div>;
}

export default LO;
