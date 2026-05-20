import axios from "axios";

const api = axios.create({
  baseURL: "https://bookingback.onrender.com/api",
  withCredentials: true, // 🔥 WICHTIG für Sanctum Cookies
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;