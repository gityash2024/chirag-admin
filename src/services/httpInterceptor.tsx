import axios from "axios";
import { baseUrl } from "../environment/environment";

const instance = axios.create({
  baseURL: baseUrl,
  
});

instance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;
    console.log(token,'=================token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.clear();
      window.location.href = "/";
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default instance;
