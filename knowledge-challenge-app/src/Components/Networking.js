export default class Network {
  async postUser(email, password, cohort_id) {
    let response = await fetch(`http://localhost:8080/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        cohort_id: cohort_id,
      }),
    });
    return response;
  }

  async postLogin(email, password) {
    let response = await fetch(`http://localhost:8080/sessions`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let json = await response.json();
    return json;
  }

  async postScore(userID, LO, score) {
    const endpoint = `http://localhost:8080/${userID}/LOs`;
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: userID,
        LO: LO,
        score: score,
      }),
    });

    const json = await response.json();
    return json;
  }

  async getAllTopicsPerStudent(userID) {
    const endpoint = `http://localhost:8080/${userID}/LOs`;
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
  }

  async getAllTopicsPerCohort(cohort_id) {
    const endpoint = `http://localhost:8080/cohorts/${cohort_id}/LOs`;
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
  }

  async getCohorts() {
    const response = await fetch(`http://localhost:8080/cohorts`);
    const json = await response.json();
    return json;
  }
}
