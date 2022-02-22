import React from "react";
import LO from "../LO/LO";

function Topic(props) {
  function createLOsList(listOfLOs) {
    listOfLOs.map((LO) => {
      return <LO descriptionOfLO={LO.LO} />;
    });

    // for (let LO of listOfLOs) {
    //   for (let property of LO) return <LO descriptionOfLO={LO[property]} />;
    // }
  }

  return (
    <div>
      <header>{props.topicName}</header>
      <main>{createLOsList(props.topicLOs)}</main>
    </div>
  );
}

export default Topic;
