import axios from "axios";

// 1️⃣ Axios-Instanz für Backend
const api = axios.create({
  baseURL: "https://bookingback.onrender.com", // Backend
  withCredentials: true,                       // Cookies erlauben
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  xsrfCookieName: "XSRF-TOKEN",   // Cookie von Sanctum
  xsrfHeaderName: "X-XSRF-TOKEN", // Header für Laravel CSRF
});

// 2️⃣ CSRF Cookie holen
const csrf = async () => {
  return api.get("/sanctum/csrf-cookie");
};

// 3️⃣ REGISTER
export const register = async (data) => {
  await csrf(); // unbedingt vorher
  const res = await api.post("/auth/register", data);
  return res.data;
};

// 4️⃣ LOGIN
export const login = async (email, password) => {
  await csrf(); // unbedingt vorher CSRF Token holen
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

// 5️⃣ LOGOUT
export const logout = async () => {
  await csrf(); // optional, aber sauber
  const res = await api.post("/auth/logout", {});
  return res.data;
};