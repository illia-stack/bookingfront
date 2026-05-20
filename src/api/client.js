import axios from "axios";

const api = axios.create({
  baseURL: "https://bookingback.onrender.com",
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| Response Debugging (optional but useful)
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;