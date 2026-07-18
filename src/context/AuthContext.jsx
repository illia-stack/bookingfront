import { createContext, useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const csrfTokenRef = useRef(null);
  const csrfPromiseRef = useRef(null);


  const fetchCsrfToken = async () => {

    if (csrfPromiseRef.current) {
      return csrfPromiseRef.current;
    }


    csrfPromiseRef.current = fetch(
      `${API_BASE_URL}/csrf`,
      {
        method: "GET",
        credentials: "include",
      }
    )
    .then(async res => {

      if (!res.ok) {
        throw new Error("CSRF request failed");
      }

      const data = await res.json();

      if (!data.csrfToken) {
        throw new Error("Missing CSRF token");
      }

      csrfTokenRef.current = data.csrfToken;

    })
    .finally(() => {

      csrfPromiseRef.current = null;

    });


    return csrfPromiseRef.current;

  };



  const authFetch = async (
    url,
    options = {}
  ) => {


    if (!csrfTokenRef.current) {
      await fetchCsrfToken();
    }


    const headers = {
      Accept: "application/json",
      ...(options.headers || {}),
    };


    if (csrfTokenRef.current) {
      headers["X-CSRF-TOKEN"] = csrfTokenRef.current;
    }


    const res = await fetch(url, {

      ...options,

      credentials: "include",

      headers,

    });


    if (res.status === 401) {

      setUser(null);

      throw new Error("UNAUTHORIZED");

    }


    return res;

  };



  const initializeAuth = async () => {

    try {

      const res = await authFetch(
        `${API_BASE_URL}/me`
      );


      if (!res.ok) {

        throw new Error(
          "Not authenticated"
        );

      }


      const data = await res.json();

      setUser(data.user || null);


    } catch (error) {

      console.log(
        "No active session"
      );

      setUser(null);


    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    initializeAuth();

  }, []);



  /*
    This does not perform login itself.
    Login.jsx already does POST /auth/login.
    This only refreshes the current user.
  */
  const refreshCsrf = async () => {

    csrfTokenRef.current = null;

    await fetchCsrfToken();

  };

  const refreshUser = async () => {

    try {

      const res = await authFetch(
        `${API_BASE_URL}/me`
      );

      if (!res.ok) {
        throw new Error("Not authenticated");
      }

      const data = await res.json();

      setUser(data.user || null);


    } catch(error) {

      setUser(null);

    }

  };



  const logout = async () => {

    try {

      await authFetch(
        `${API_BASE_URL}/auth/logout`,
        {
          method:"POST",
        }
      );


      await refreshCsrf();


    } catch(error) {

      console.warn(
        "Logout failed",
        error
      );

    }
    finally {

      setUser(null);

    }

  };



  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        refreshCsrf,
        logout,
        authFetch,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};