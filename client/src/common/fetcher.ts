import axios from "axios";
import { getAppToken } from "./utils";

const appToken = getAppToken();

export const fetcher = axios.create({
  //   baseURL: "/server",
  timeout: 3000,
  headers: {
    Authorization: appToken ? `Bearer ${appToken}` : "",
    // "Access-Control-Allow-Origin": "www.localhost.com:3001",
    // "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    // "Access-Control-Allow-Credentials": "true",
  },
});

export const ssgEndpoint = axios.create({
  baseURL: "http://www.localhost:3000",
  timeout: 3000,
  headers: {
    Authorization: appToken ? `Bearer ${appToken}` : "",
  },
});
