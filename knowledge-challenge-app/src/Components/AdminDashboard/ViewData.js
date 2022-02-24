import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router-dom";
import Header from "../Header";
import Network from "../Networking";

export default function ViewData(props) {
  const network = new Network();

  // useEffect(() => {
  //   ();
  // }, []);

  //   function createCohortsList() {
  //     return cohorts.map((cohort, i) => <Button key={i}>Cohort {cohort.cohort_id}</Button>);
  //   }

  console.log(props.location.state);

  function createTopicList() {
    return props.location.state.cohortLOs.map((cohort, i) => (
      <div key={i}>
        <h4>{cohort.learning_objective}</h4>
      </div>
    ));
  }

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />

      <Container className="py-4 m-5 p-5">
        {!props.isLog ? (
          <Redirect to="/" />
        ) : (
          <>
            <h1>
              welcome to <u>cohort {props.location.state.cohortLOs[0].cohort_id}</u>
            </h1>
            {createTopicList()}
          </>
        )}
      </Container>
    </>
  );
}
