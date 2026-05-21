import axios from "axios";

const api = axios.create({
  baseURL: "https://bookingback.onrender.com",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export const csrf = async () => {
  return api.get("/sanctum/csrf-cookie");
};

api.interceptors.request.use((config) => {
  console.log("REQ:", config.url, config.withCredentials);
  return config;
});

export const register = (data) =>
  csrf().then(() => api.post("/auth/register", data));

export const login = async (email, password) => {
  await csrf();
  return api.post("/auth/login", { email, password });
};

export const logout = () =>
  api.post("/auth/logout");

export default api;