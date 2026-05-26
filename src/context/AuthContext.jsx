import { createContext, useContext, useEffect, useState } from "react";

import { login as apiLogin, register as apiRegister, logout as apiLogout } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Initial Load (localStorage → state)
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Auth load error", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    try {
    const res = await apiLogin(email, password);

    const newUser = res.data.user;
    const newToken = res.data.token;

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", newToken);

    setUser(newUser);
    setToken(newToken);
    } catch (err) {
        throw err; // damit UI es handeln kann
    };

    return res;
  };

  // 📝 REGISTER
  const register = async (form) => {
    const res = await apiRegister(form);

    const newUser = res.data.user;
    const newToken = res.data.token;

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", newToken);

    setUser(newUser);
    setToken(newToken);

    return res;
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}