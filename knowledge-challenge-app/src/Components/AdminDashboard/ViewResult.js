import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router-dom";
import Header from "../Header";
import Network from "../Networking";
import "./view-result.css";

export default function ViewResult(props) {
  const network = new Network();
  const [studentData, setStudentData] = useState("");
  useEffect(() => {
    (async () => {
      setStudentData(await network.getStudentData(props.location.state.userID));
    })();
  }, []);

  console.log(studentData);

  function renderData() {
    if (!studentData) {
      return <h1>...Loading</h1>;
    }
    return studentData.map((data) => (
      <div className="flex-it">
        <div className="topic">{data.topic}</div>
        <div className="topic2">{data.learning_objective}</div>
        <div className="topic">{data.score}</div>
      </div>
    ));
  }

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <> {!props.isLog ? <Redirect to="/" /> : <div className="par">{renderData()}</div>}</>
    </>
  );
}
