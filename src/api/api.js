// api.js
import axios from "axios";

// eine einzige Axios-Instanz für alles
const api = axios.create({
  baseURL: "https://bookingback.onrender.com",
  withCredentials: true,        // 🔑 Cookies über Domain
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// optional: Debug
api.interceptors.request.use((config) => {
  console.log("REQ:", config.method?.toUpperCase(), config.url);
  return config;
});

// CSRF Cookie holen
export const csrf = () => api.get("/sanctum/csrf-cookie");

// AUTH
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

// USER / ADMIN ROUTES
export const getCurrentUser = () => api.get("/auth/user");

export const getUsers = () => api.get("/api/admin/users");

export const exportBookings = () =>
  api.get("/api/admin/export-bookings", { responseType: "blob" });

export default api;