import axios from "axios";

var token = window.localStorage.getItem("token");
console.log(token)
const CancelToken = axios.CancelToken;
let cancel;

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `SWdMKUp`,
  },
  cancelToken: new CancelToken(function executor(c) {
    cancel = c;
  }),
});

export default {
  fetch: instance,
  cancel,
};
