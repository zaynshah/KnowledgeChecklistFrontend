import React, { useEffect, useState } from "react";
import confidenceButton from "../confidenceButton/confidenceButton";

function LO() {
  //   const [name, setName] = useState();

  useEffect(() => {});

  function createButtons() {
    return (
      <div>
        <confidenceButton text="Not confident" />
        <confidenceButton text="Needs revision" />
        <confidenceButton text="Feel confident" />
      </div>
    );
  }

  return <div>{createButtons}</div>;
}

export default LO;
