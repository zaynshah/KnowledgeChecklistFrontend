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

  // function studentResult(data) {
  //   if (data.score == 1) {
  //     <span>unspecified</span>;
  //   } else {
  //     <h1>bue</h1>;
  //   }
  // }

  function getScore(data) {
    if (data.score === 1) {
      return <div className="topic3">Unspecified</div>;
    } else if (data.score === 2) {
      return <div className="topic3 not-confident">Not Confident!</div>;
    } else if (data.score === 3) {
      return <div className="topic3 needs-revision">Needs Revision!</div>;
    } else if (data.score === 4) {
      return <div className="topic3 feels-confident">Feels Confident!</div>;
    }
  }

  function renderData() {
    if (!studentData) {
      return <h1>...Loading</h1>;
    }
    return studentData.map((data) => (
      <div className="flex-it">
        <div className="topic">{data.topic}</div>
        <div className="topic2">{data.learning_objective}</div>
        {getScore(data)}
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
