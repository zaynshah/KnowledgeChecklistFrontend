import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Network from "../Networking";

function StudentDashboard(props) {
  const [data, setData] = useState([]);
  const network = new Network();

  document.title = `${props.coachName}'s Portal`;

  useEffect(() => {});

  function createCohortList(data, topic) {
    return <Cohort />;
  }

  function getLoadingComponent() {
    return <div className="loader" />;
  }

  function getWelcomeMessage(name) {
    return <header>Welcome, {name}</header>;
  }

  return (
    <div>
      {getWelcomeMessage(props.coachName)}
      <main className="topics">
        {/* {data ? createTopics(data) : getLoadingComponent()} */}
      </main>
    </div>
  );
}

export default CoachDashboard;
