import React, { useState } from "react";
import "./App.css";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";

function App() {
  const [name, setName] = useState("Fahmidul");
  return (
    <div className="App">
      <StudentDashboard studentName={name} />
    </div>
  );
}

export default App;
