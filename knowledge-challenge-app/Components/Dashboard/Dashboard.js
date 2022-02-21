import React, { useEffect, useState } from "react";

function Dashboard() {
  const [name, setName] = useState();

  useEffect(() => {});

  function getWelcomeMessage() {
    return (
      <div>
        <header>Welcome, {name}. </header>
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

  return { getWelcomeMessage };
}

export default Dashboard;
