import axios from "axios";
import { getCookie } from "./cookie";
import { decrypt } from "./crypto";
var os = require("os");

var uri = "https://bookmybus.herokuapp.com/";

if (os.hostname().indexOf("local") > -1) {
  uri = "http://localhost:3000/";
}

const axiosConfig = axios.create({
  baseURL: uri,
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
