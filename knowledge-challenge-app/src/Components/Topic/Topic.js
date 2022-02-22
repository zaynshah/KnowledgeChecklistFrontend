import React from "react";
import LO from "../LO/LO";

function Topic(props) {
  function createLOsList(listOfLOs) {
    listOfLOs.map((LO) => {
      return <LO descriptionOfLO={LO.LO} />;
    });
  }

  return (
    <div>
      <header>{props.topicName}</header>
      <main>{createLOsList(props.topicLOs)}</main>
    </div>
  );
}

export default Topic;
