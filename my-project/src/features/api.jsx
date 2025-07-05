import axios from "axios";
import { store } from "../store";

export const axiosAuth = axios.create({
  baseURL: "http://localhost:5000",
});

axiosAuth.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
