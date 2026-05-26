import axios from "axios";

const api = axios.create({
  baseURL: "https://bookingback.onrender.com/api",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// REQUEST
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE
api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    if (process.env.NODE_ENV === "development") {
      console.error(
        "API Error:",
        error.response?.data || error.message
      );
    }

    return Promise.reject(error);
  }
);

export default api;