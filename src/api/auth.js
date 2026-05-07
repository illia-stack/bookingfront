import api from "./client";

export const login = async (email, password) => {

  const res = await api.post("/auth/login", {
    email,
    password
  });

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res;
};

export const logout = async () => {
  await api.post("/logout");
  localStorage.removeItem("token");
};