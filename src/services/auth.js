import api from "../api/client";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });

  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post("/auth/register", data);

  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const logout = async () => {
  await api.post("/logout");
  localStorage.removeItem("token");
};
