import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
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

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <Container className="py-4 m-5 p-5">
        <h1>welcome to cohort</h1>
      </Container>
    </>
  );
}
