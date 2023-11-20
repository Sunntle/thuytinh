import axios from "axios";
import { useDispatch } from "react-redux";
import { doLogoutAction } from "../redux/account/accountSlice";
const instance = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? import.meta.env.VITE_APP_API_URL_PRODUCTION : import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});
const handleRefreshToken = async () => {
  const res = await instance.get("/api/user/refresh-token");
  return res ? res : null;
};
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("access_token") || "";
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response && response?.data;
  },
  async function (error) {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      window.location.pathname !== "/"
    ) {
      const { token, success } = await handleRefreshToken();
      if (token && success) {
        error.config.headers["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("access_token", token);
        return instance.request(error.config);
      }
    }
    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      window.location.pathname !== "/"
    ) {
      const dispatch = useDispatch();
      dispatch(doLogoutAction());
      window.location.href = "/";
    }
    return error?.response?.data ?? Promise.reject(error);
  }
);
export default instance;
