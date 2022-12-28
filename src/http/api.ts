import axios from "axios";

const PORT = 3000

export const API_BASE_URL = "https://wbsuperparser.herokuapp.com/api/v1/";
export const APP_BASE_URL = `http://localhost:${PORT}`

const $api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    common: {
      accept: 'application/json'
    }
  }
});

export { $api };