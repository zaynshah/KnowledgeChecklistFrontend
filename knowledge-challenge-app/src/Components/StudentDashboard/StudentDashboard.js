import React, { useEffect, useState } from "react";
import Topic from "../Topic/Topic";
import Network from "../Networking";

function StudentDashboard(props) {
  const [topicList, setTopicList] = useState([]);
  // const [studentName, setStudentName] = useState();

  async function fetchTopics(studentName) {
    const topics = await Network.getAllTopics(studentName);
    setTopicList(topics);
  }

  useEffect(() => {
    document.title = `${props.studentName}'s Knowledge Checklist`;

    fetchTopics(props.studentName);
  });

  function getWelcomeMessage() {
    return (
      <div>
        <header>Welcome, {studentName}. </header>
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

  function getTopics() {
    topics.map((topic) => {
      return <Topic />;
    });
  }

  return { getWelcomeMessage };
}

export default StudentDashboard;
