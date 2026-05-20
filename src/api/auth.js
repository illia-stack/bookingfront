import axios from "axios";

// Axios-Instanz für Backend
const api = axios.create({
  baseURL: "https://bookingback.onrender.com", // Backend-Domain
  withCredentials: true,                       // wichtig für Cookies
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  xsrfCookieName: "XSRF-TOKEN",   // Cookie, das Sanctum für CSRF setzt
  xsrfHeaderName: "X-XSRF-TOKEN", // Header, den Laravel prüft
});

// 1️⃣ CSRF Cookie holen
const csrf = () => {
  // GET auf /sanctum/csrf-cookie -> Browser setzt XSRF-TOKEN Cookie
  return api.get("/sanctum/csrf-cookie");
};

// 2️⃣ REGISTER
export const register = async (data) => {
  await csrf(); // zuerst CSRF holen
  const res = await api.post("/auth/register", data);
  return res.data;
};

// 3️⃣ LOGIN
export const login = async (email, password) => {
  await csrf(); // unbedingt vorher CSRF holen
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

// 4️⃣ LOGOUT
export const logout = async () => {
  await csrf(); // optional, aber sicher
  const res = await api.post("/auth/logout", {});
  return res.data;
};