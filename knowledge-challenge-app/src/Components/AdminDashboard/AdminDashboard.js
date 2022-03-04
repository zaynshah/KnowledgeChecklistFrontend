import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
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
      document.title = props.cookies.email ? `${props.cookies.email.split("@")[0]}'s Knowledge Checklist` : "Knowledge Checklist";
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
        <Button onClick={() => handleClick(cohort.cohort_id)} className="mb-2" variant="dark">
          Cohort {cohort.cohort_id}
        </Button>
      </div>
    ));
  }

  async function getLatestCohort() {
    const cohortIDs = cohorts.map((cohort) => cohort.cohort_id);
    const newCohortID = Math.max(...cohortIDs) + 1;
    const response = await network.postCohort(newCohortID);
    if (response === 200) {
      setCohorts(await network.getCohorts());
    }
  }

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
                  Select a cohort below to view the learning objectives for that cohort. You can add learning objectives for the cohort on the next
                  page.
                </p>
                {createCohortsList()}
              </Card.Body>
            </Card>
            <Card className="mt-4">
              <Card.Header as="h2">Add a new cohort</Card.Header>
              <Card.Body>
                <Button variant="outline-dark" onClick={getLatestCohort}>
                  Click me to add a new cohort
                </Button>
              </Card.Body>
            </Card>
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}
