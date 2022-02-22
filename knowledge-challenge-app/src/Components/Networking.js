export default class Network {
  async getAllTopics(cohort) {
    const endpoint = `http://localhost:8080/${cohort}/LOs`;
    const response = await fetch(endpoint);
    const json = await response.json();
    console.log(json);
    return json;
  }
}
