import api from "./client";



export const register = async ({ name, email, password, password_confirmation }) => {
  const res = await api.post("/auth/register", { name, email, password, password_confirmation });
  return res.data; // Cookie wird gesetzt, kein LocalStorage nötig
};



export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  // Cookie wird automatisch vom Browser gespeichert
  return res.data;
};




export const logout = async () => {
  await api.post("/auth/logout");
};