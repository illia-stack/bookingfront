import { createContext, useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const csrfPromiseRef = useRef(null);


  function getCookie(name) {

    return document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1];

  }


  const fetchCsrfToken = async () => {

    if (csrfPromiseRef.current) {
      return csrfPromiseRef.current;
    }


    csrfPromiseRef.current = fetch(
      `${API_BASE_URL}/sanctum/csrf-cookie`,
      {
        method: "GET",
        credentials: "include",
      }
    )
    .then(res => {

      if (!res.ok) {
        throw new Error("CSRF request failed");
      }

      return true;

    })
    .finally(() => {

      csrfPromiseRef.current = null;

    });


    return csrfPromiseRef.current;

  };



  const authFetch = async (
    url,
    options = {},
    retry = true
  ) => {

    let xsrfToken = decodeURIComponent(
      getCookie("XSRF-TOKEN") || ""
    );

    if (!xsrfToken) {
      await fetchCsrfToken();

      xsrfToken = decodeURIComponent(
        getCookie("XSRF-TOKEN") || ""
      );
    }


    const headers = {
      ...(options.headers || {}),
      "Accept": "application/json",
    };

    if (xsrfToken) {
      headers["X-XSRF-TOKEN"] = xsrfToken;
    }


    if (
      options.body &&
      !(options.body instanceof FormData)
    ) {
      headers["Content-Type"] = "application/json";
    }



    const res = await fetch(url, {

      ...options,

      credentials: "include",

      headers,

    });



    if (res.status === 419 && retry) {

      await fetchCsrfToken();
      return authFetch(url, options, false);

    }



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
        logout,
        authFetch,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};