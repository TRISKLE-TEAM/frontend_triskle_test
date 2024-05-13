import axios from "axios";

export const api = axios.create({
  // baseURL: "http://172.22.0.188:3333/",
  baseURL: "http://localhost:3333/",
});
