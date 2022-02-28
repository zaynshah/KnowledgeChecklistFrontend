import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { Link, Redirect } from "react-router-dom";
import { Card } from "react-bootstrap";
import Header from "../Header";
import Footer from "../Footer";
import Network from "../Networking";

export default function AdminDashboard(props) {
  const network = new Network();
  const [cohorts, setCohorts] = useState([]);
  const [cohortLOs, setCohortLOs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState([]);
  useEffect(() => {
    (async () => {
      setCohorts(await network.getCohorts());
    })();
  }, []);

  async function handleClick(cohort_id) {
    setCohortLOs(await network.getAllTopicsPerCohort(cohort_id));
    setStudents(await network.getStudentForCohort(cohort_id));
    setSelectedCohort(cohort_id);
    setRedirect(true);
  }

  function createCohortsList() {
    return cohorts.map((cohort, i) => (
      <div key={i}>
        <Button
          onClick={() => handleClick(cohort.cohort_id)}
          className="mb-2"
          variant="dark"
        >
          Cohort {cohort.cohort_id}
        </Button>
      </div>
    ));
  }
  console.log(props);
  console.log(cohorts);

  return (
    <>
      <Header cook={props.cookies.email} logOut={props.logOut} />
      <Container className="py-4 mt-3 p-5">
        {redirect ? (
          <Redirect
            push
            to={{
              pathname: "/cohorts",
              state: { cohortLOs, cohorts, students },
            }}
          />
        ) : (
          <>
            <Card>
              <Card.Header as="h2">Welcome to the admin dashboard</Card.Header>
              <Card.Body>
                {" "}
                <p className="fs-5 mb-4">
                  Select a cohort below to view the learning objectives for that
                  cohort. You can add learning objectives for the cohort on the
                  next page.
                </p>
                {createCohortsList()}
              </Card.Body>
            </Card>
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}
