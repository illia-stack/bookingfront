import axios from "axios";

const api = axios.create({
  baseURL: "https://bookingback.onrender.com",
  withCredentials: true, 
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

export const csrf = async () => {
  await api.get("/sanctum/csrf-cookie", {
    headers: { "Cache-Control": "no-cache" },
  });
};

export const register = async (data) => {
  await csrf(); 
  const res = await api.post("/auth/register", data); 
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