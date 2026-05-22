import axios from "axios";

const api = axios.create({
  baseURL: "https://bookingback.onrender.com",
  withCredentials: true,        
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

api.interceptors.request.use((config) => {
  console.log("REQ:", config.method?.toUpperCase(), config.url);
  return config;
});


export const csrf = () => api.get("/sanctum/csrf-cookie");


export const register = async (data) => {
  await csrf();
  return api.post("/auth/register", data);
};

export const login = async (email, password) => {
  await csrf();
  return api.post("/auth/login", { email, password });
};

export const logout = async () => {
  return api.post("/auth/logout");
};


export const getCurrentUser = () => api.get("/auth/user");

export const getUsers = () => api.get("/api/admin/users");

export const exportBookings = () =>
  api.get("/api/admin/export-bookings", { responseType: "blob" });

export default api;