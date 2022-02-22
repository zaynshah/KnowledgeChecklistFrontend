export default class Network {
  async getAllTopics(studentName, cohortID) {
    const endpoint = `localhost:8080/${studentName}/${cohortID}`;
    const response = await fetch(endpoint);
    const json = response.json();
    return json;
  }
}
