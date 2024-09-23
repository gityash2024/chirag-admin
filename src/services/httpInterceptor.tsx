import axios from "axios";
import { baseUrl } from "../environment/environment";

const instance = axios.create({
  baseURL: baseUrl,
  
});

instance.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.token) {
      config.headers["x-access-user"] = userData.accountId;
      config.headers["x-access-token"] = userData.token;
      config.headers["authorization"] = `Bearer ${userData.token}`;
      // config.headers["ngrok-skip-browser-warning"] = `69420`;
      // "ngrok-skip-browser-warning": "69420"
    }
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
