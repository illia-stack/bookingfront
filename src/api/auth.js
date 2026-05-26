import api from "./client";

export const login = async (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const register = async (data) => {
  return api.post("/auth/register", data);
};

export const logout = async () => {
  return api.post("/auth/logout");
};