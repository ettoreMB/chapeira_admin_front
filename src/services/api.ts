import axios from "axios";

export const api = axios.create({
  baseURL: "https://chapeira.wfbtecnologia.com.br",
});
