import axios from "axios";
const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
  // eslint-disable-next-line no-undef
  baseURL: import.meta.env.MODE === 'production' ? import.meta.env.VITE_APP_API_URL_PRODUCTION : import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    const idToken = localStorage.getItem("idToken") || "";
    if (idToken) config.headers["Authorization"] = `Bearer ${idToken}`;
    return config;
  },
  (error) => {
    console.log(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized");
    } else {
      return error.response.data;
    }
  }
);
export default instance;
