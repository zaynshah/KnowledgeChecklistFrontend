const API_URL = "https://secure-beyond-91900.herokuapp.com";
// "http://localhost:8080";
// https://secure-beyond-91900.herokuapp.com

export default class Network {
  async postUser(email, password, cohort_id) {
    let response = await fetch(`${API_URL}/users`, {
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
    let response = await fetch(`${API_URL}/sessions`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    return json;
  }

  async postScore(userID, LO, score, isActive) {
    const endpoint = `${API_URL}/${userID}/LOs`;
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
        isActive: isActive,
      }),
    });

    const json = await response.json();
    return json;
  }

  async getAllTopicsPerStudent(userID) {
    const endpoint = `${API_URL}/${userID}/LOs`;
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
  }

  async getAllTopicsOnlyPerStudent(userID) {
    const endpoint = `${API_URL}/${userID}/topics`;
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
  }

  async getAllTopicsPerCohort(cohort_id) {
    const endpoint = `${API_URL}/cohorts/${cohort_id}/LOs`;
    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
  }

  async getCohorts() {
    const response = await fetch(`${API_URL}/cohorts`);
    const json = await response.json();
    return json;
  }

  async postLO(cohort_id, topic, learning_objective, notConfident, confident) {
    const response = await fetch(`${API_URL}/postLO`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cohort_id: cohort_id,
        topic: topic,
        learning_objective: learning_objective,
        notConfident: notConfident,
        confident: confident,
      }),
    });
    return response;
  }

  async getStudentForCohort(cohort_id) {
    const response = await fetch(`${API_URL}/students/${cohort_id}/results`);
    const json = await response.json();
    return json;
  }

  async getAllUniqueCohortTopics(cohort_id) {
    const response = await fetch(`${API_URL}/cohort/${cohort_id}/cohortTopics`);
    const json = await response.json();
    return json;
  }

  async getStudentData(user_id) {
    const response = await fetch(`${API_URL}/student/${user_id}/data`);
    const json = await response.json();
    return json;
  }

  async deleteLOS(learning_objective, cohort_id) {
    const response = await fetch(`${API_URL}/deleteLOs`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        learning_objective: learning_objective,
        cohort_id: cohort_id,
      }),
    });
    return response.status;
  }

  async postCohort(cohort_id) {
    const response = await fetch(`${API_URL}/postCohort`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cohort_id: cohort_id,
      }),
    });
    return response.status;
  }

  async postDark(darkMode, userID) {
    const response = await fetch(`${API_URL}/postDark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        darkMode: darkMode,
        userID: userID,
      }),
    });
    return response.status;
  }

  async postNewLO(newLO, newNotConfident, newConfident, oldLO) {
    const response = await fetch(`${API_URL}/postNewLO`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newLO: newLO,
        newNotConfident: newNotConfident,
        newConfident: newConfident,
        oldLO: oldLO,
      }),
    });
    return response;
  }
}
