import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_RAPID_API_URL,
});

api.interceptors.request.use(function (config) {
  config.headers = {
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  };
  return config;
});

export { api };
