import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Header from "../Header";
import Network from "../Networking";

export default function AdminDashboard(props) {
  const network = new Network();
  const [cohorts, setCohorts] = useState([]);
  const [cohortLOs, setCohortLOs] = useState([]);

  useEffect(() => {
    (async () => {
      setCohorts(await network.getCohorts());
    })();
  }, []);

  async function handleClick(cohort_id) {
    setCohortLOs(await network.getAllTopicsPerCohort(cohort_id));
    console.log(await network.getAllTopicsPerCohort(cohort_id));
  }

  function createCohortsList() {
    return cohorts.map((cohort, i) => (
      <div key={i}>
        <Button
          onClick={() => handleClick(cohort.cohort_id)}
          className="mb-2"
          variant="outline-dark"
        >
          Cohort {cohort.cohort_id}
        </Button>{" "}
      </div>
    ));
  }

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <Container className="py-4 m-5 p-5">
        <h1>Welcome to the admin dashboard</h1>
        <p className="fs-5 mb-4">
          Select a cohort below to view the learning objectives.
        </p>
        {createCohortsList()}
      </Container>
    </>
  );
}
