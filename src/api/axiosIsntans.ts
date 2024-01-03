import axios from "axios";

export const axiosInstans = axios.create({
  timeout: 20000,
  baseURL: import.meta.env.VITE_API_URL,
  //  withCredentials: true,
});
