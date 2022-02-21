import React, { useEffect, useState } from "react";
import LO from "../LO/LO";

function Topic(props) {
  //   const [name, setName] = useState();

  useEffect(() => {
    const listLOs = getLOs();
    renderLOs(listLOs);
  });

  async function getLOs(topic) {
    const endpoint = `http://localhost:8080/${props.username}/`;
    const listLOs = await fetch(endpoint);
    return listLOs;
  }

  // expecting LOs as an object

  function renderLOs() {
    listLOs.map((LO) => {
      return <LO text={LO.description} />;
    });
  }

  const listLOs = getLOs();

  return (
    <div>
      <header>{props.topicName}</header>
      <main>{renderLOs}</main>
    </div>
  );
}

export default Topic;
