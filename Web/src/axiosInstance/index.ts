import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  config => {
    if (localStorage.getItem('isLoggedIn')) {
      config.headers['X-ADMIN'] = 1;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export { axiosInstance, BASE_URL };