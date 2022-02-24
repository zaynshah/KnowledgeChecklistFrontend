import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
// import "antd/dist/antd.css";
// import { Select } from "antd";
import Header from "../Header";
import Network from "../Networking";

export default function AdminDashboard(props) {
  const network = new Network();
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    (async () => {
      setCohorts(await network.getCohorts());
      console.log(await network.getCohorts());
    })();
  }, []);

  function createCohortsList() {
    return cohorts.map((cohort, i) => (
      <Button key={i}>Cohort {cohort.cohort_id}</Button>
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
