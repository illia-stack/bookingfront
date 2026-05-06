import axios from "axios";
import { API_URL } from "./server";

const api = axios.create({
  baseURL: API_URL,
});

// Token automatisch anhängen
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;