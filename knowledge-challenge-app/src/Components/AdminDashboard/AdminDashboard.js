import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { Redirect, Link } from "react-router-dom";
// import "antd/dist/antd.css";
// import { Select } from "antd";
import Header from "../Header";
import Network from "../Networking";

export default function AdminDashboard(props) {
  const network = new Network();
  const [cohorts, setCohorts] = useState([]);
  const [a, setA] = useState("A");

  useEffect(() => {
    (async () => {
      setCohorts(await network.getCohorts());
      console.log(await network.getCohorts());
    })();
  }, []);

  function handleClick() {}

  function createCohortsList() {
    return cohorts.map((cohort, i) => (
      <Link to="/cohort">
        <Button key={i}>Cohort {cohort.cohort_id}</Button>)
      </Link>
    ));
  }

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <Container className="py-4 m-5 p-5">
        <h1>Welcome to the admin dashboard</h1>
        <p className="fs-5 mb-4">Select a cohort below to view the learning objectives.</p>
        {createCohortsList()}
      </Container>
    </>
  );
}
