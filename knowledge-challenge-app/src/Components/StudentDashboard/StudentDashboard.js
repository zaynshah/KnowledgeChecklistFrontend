import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Network from "../Networking";
import Header from "../Header";
import LO from "../LO/LO";

function StudentDashboard(props) {
  const [data, setData] = useState([]);
  const network = new Network();

  document.title = `${props.studentName}'s Knowledge Checklist`;

  useEffect(() => {
    (async () => {
      setData(await network.getAllTopics(1));
    })();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await network.getAllTopics(1);
  //     setData(data);
  //   }
  //   fetchData();
  // });

  // async function fetchData(cohortID) {
  //   const data = await network.getAllTopics(cohortID);
  //   return JSON.stringify(data);
  // }

  function getWelcomeMessage() {
    return (
      <div>
        <header>Welcome, {props.studentName}. </header>
        <main>
          <p>
            Select your level of confidence with the buttons next to each
            statement. Choosing 'not confident' will colour the statement red.
            Choosing 'needs review' will colour the statement yellow. Finally,
            choosing 'feel confident' will colour the statement green. Red
            topics are those you don't understand well. Yellow still need work.
            Green are the ones you feel most confident with.
          </p>
          <p>
            At the bottom of the page, there is a button to print / save your
            progress. Be sure to check the box 'background graphics' under more
            settings. This wil allow you to save a PDF or print a version of the
            page with the selections you have made. Additionally, you may prefer
            landscape orientation to portrait for ease of reading.
          </p>
        </main>
      </div>
    );
  }

  function createTopics(data, topic) {
    const filteredData = data.filter((objects) => objects.topic === topic); // [{},{}]
    console.log(filteredData);

    const topicData = filteredData.map((topic) => {
      return <LO key={topic.id} learningObjective={topic.learning_objective} />;
    });

    return topicData;
  }

  function getLoadingComponent() {
    return <div className="loader" />;
  }

  return (
    <>
      <Header logOut={props.logOut} />
      <div>
        <h1>working</h1>
      </div>
    </>
  );
}

export default StudentDashboard;
