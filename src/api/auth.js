import api from "./client";

export const register = async (data) => {

  const res = await api.post("/auth/register", data);

  localStorage.setItem("token", res.data.token);

  return res.data;
};

export const login = async (email, password) => {

  const res = await api.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);

  return res.data;
};

export const logout = async () => {

  await api.post("/auth/logout");

  localStorage.removeItem("token");
};

export default api;