import axios from "axios";
import { getCookie } from "./cookie";
import { decrypt } from "./crypto";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3000",
});

axiosConfig.interceptors.request.use(
  function (config) {
    let Token = getCookie("auth");
    if (Token) config.headers["Authorization"] = "Token " + Token;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;
