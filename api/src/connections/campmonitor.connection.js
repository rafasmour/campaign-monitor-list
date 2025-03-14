import env from "../vars/env.js";
import axios from "axios";

const apiKey = env.CAMPMONITOR_API_KEY;
const apiVersion = env.CAMPMONITOR_API_VERSION;
const apiURL = env.CAMPMONITOR_API_URL + apiVersion;
const axiosConfig = {
    headers: {
        "Application": "application/json",
    },
    auth: {
        username: apiKey,
        password: ""
    }
}
const apiTest = axios.get(
    apiURL + "/clients.json",
    axiosConfig,
)

export { apiURL, axiosConfig, apiTest };

