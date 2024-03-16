import axios from "axios";

axios.defaults.withCredentials = true; // adds cookies to the request

const client = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});

export default client;
