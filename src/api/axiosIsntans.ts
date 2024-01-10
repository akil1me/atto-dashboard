import axios from "axios";
import { store } from "../redux";
import { loginActions } from "../redux/login.slice";
import { getLanguage, getToken } from "../utils";

export const axiosInstans = axios.create({
  timeout: 20000,
  baseURL: import.meta.env.VITE_API_URL,
  //  withCredentials: true,
});

axiosInstans.interceptors.request.use(
  function (config) {
    config.headers.language = getLanguage();
    config.headers.token = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstans.interceptors.response.use(
  (res) => res,
  (err: any) => {
    if (err.response?.status === 401) {
      // toast.error(err.response.data.message, { id: "mutate", duration: 2000 });
      store.dispatch(loginActions.setToken(null));
    }
    return Promise.reject(err);
  }
);
