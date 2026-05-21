import axios from "axios";

const api = axios.create({
  baseURL: "https://bookingback.onrender.com",
  withCredentials: true, // Cookies erlauben
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

export const csrf = async () => {
  // ⚡ GET Cookie + keine Cache
  await api.get("/sanctum/csrf-cookie", {
    headers: { "Cache-Control": "no-cache" },
  });
};

export const register = async (data) => {
  await csrf(); // CSRF Token holen
  const res = await api.post("/auth/register", data); // Cookie Auth wird automatisch gesendet
  return res.data;
};

export const login = async (email, password) => {
  await csrf();
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout", {});
  return res.data;
};

export default api;