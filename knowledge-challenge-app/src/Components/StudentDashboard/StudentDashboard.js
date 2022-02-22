import React, { useEffect, useState } from "react";
import Topic from "../Topic/Topic";
import Network from "../Networking";
import exampleData from "../../exampleData";

// Check how the student name will be passed in as props
function StudentDashboard(props) {
  const testData = exampleData;
  const [topicList, setTopicList] = useState([testData]);

  async function fetchTopics(studentName) {
    const topics = await Network.getAllTopics(studentName);
    setTopicList(topics);
  }

  useEffect(() => {
    document.title = `${props.studentName}'s Knowledge Checklist`;

    // waiting to build server.js response
    // fetchTopics(props.studentName);
    createTopics(topicList);
  });

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

  function createTopics(topicList) {
    topicList.map((topic) => {
      return <Topic topicName={topic.topic} topicLOs={topic.LOs} />;
    });
  }

  return (
    <div>
      {getWelcomeMessage()}
      <main className="topics">
        {topicList ? createTopics(topicList) : null}
      </main>
    </div>
  );
}

export default StudentDashboard;
