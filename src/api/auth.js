import axios from "axios";

// CSRF COOKIE holen
const csrf = () => {
  return axios.get(
    "https://bookingback.onrender.com/sanctum/csrf-cookie",
    { withCredentials: true }
  );
};

// REGISTER
export const register = async (data) => {
  await csrf();
  const res = await axios.post(
    "https://bookingback.onrender.com/auth/register",
    data,
    { withCredentials: true }
  );
  return res.data;
};

// LOGIN
export const login = async (email, password) => {
  await csrf();
  const res = await axios.post(
    "https://bookingback.onrender.com/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

// LOGOUT
export const logout = async () => {
  const res = await axios.post(
    "https://bookingback.onrender.com/auth/logout",
    {},
    { withCredentials: true }
  );
  return res.data;
};