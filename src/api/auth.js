import api from "./client";

/*
|--------------------------------------------------------------------------
| CSRF (MUSS VOR LOGIN/REGISTER GEHEN)
|--------------------------------------------------------------------------
*/
export const csrf = () => api.get("/sanctum/csrf-cookie");

/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/
export const register = async (data) => {
  await csrf();

  const res = await api.post("/api/auth/register", data);

  return res.data;
};

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/
export const login = async (email, password) => {
  await csrf();

  const res = await api.post("/api/auth/login", {
    email,
    password,
  });

  return res.data;
};

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/
export const logout = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

/*
|--------------------------------------------------------------------------
| GET CURRENT USER (VERY IMPORTANT)
|--------------------------------------------------------------------------
*/
export const getUser = async () => {
  const res = await api.get("/api/user");
  return res.data;
};