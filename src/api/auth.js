import api from "./client";

// CSRF COOKIE (Pflicht für Sanctum)
const csrf = () => api.get("/sanctum/csrf-cookie");

// REGISTER
export const register = async (data) => {
  await csrf();

  const res = await api.post("/auth/register", data);

  return res.data;
};

// LOGIN
export const login = async (email, password) => {
  await csrf();

  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
};

// LOGOUT
export const logout = async () => {
  const res = await api.post("/logout");
  return res.data;
};

// CURRENT USER
export const getUser = async () => {
  const res = await api.get("/user");
  return res.data;
};