import { createContext, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [csrfToken, setCsrfToken] = useState(null);

  const csrfPromiseRef = useRef(null);


  // ==========================
  // CSRF
  // ==========================

  const refreshCsrf = async () => {

    if (csrfPromiseRef.current) {
      return csrfPromiseRef.current;
    }

    csrfPromiseRef.current = (async () => {

      try {

        const res = await fetch(
          `${API_BASE_URL}/auth/csrf`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch CSRF");
        }

        const data = await res.json();

        if (!data?.csrfToken) {
          throw new Error("Missing CSRF token");
        }

        setCsrfToken(data.csrfToken);

        return data.csrfToken;

      } finally {

        csrfPromiseRef.current = null;

      }

    })();

    return csrfPromiseRef.current;

  };  



  // ==========================
  // CENTRAL AUTH FETCH
  // ==========================

  const authFetch = async (
    url,
    options = {},
    retry = true
  ) => {


    let token = csrfToken;


    if (!token) {
      token = await refreshCsrf();
    }


    const headers = {
      ...(options.headers || {}),
      "X-CSRF-Token": token,
    };


    if (
      options.body &&
      !(options.body instanceof FormData)
    ) {
      headers["Content-Type"] = "application/json";
    }


    const res = await fetch(
      url,
      {
        ...options,
        headers,
        credentials: "include",
      }
    );



    // CSRF expired
    if (res.status === 419 && retry) {

      csrfPromiseRef.current = null;

      await refreshCsrf();

      return authFetch(
        url,
        options,
        false
      );
    }



    if (res.status === 401) {

      setUser(null);

      throw new Error("UNAUTHORIZED");
    }



    if (res.status === 419 && !retry) {

      setUser(null);

      throw new Error("SESSION_EXPIRED");
    }


    return res;

  };




  // ==========================
  // GET CURRENT USER
  // ==========================

  const refreshUser = async () => {

    try {

      const res = await fetch(
        `${API_BASE_URL}/auth/me`,
        {
          credentials: "include",
        }
      );


      if (!res.ok) {

        setUser(null);

        return;
      }


      const data = await res.json();


      setUser(
        data.user || null
      );


    } catch (err) {

      console.error(
        "Refresh user failed:",
        err
      );

      setUser(null);
    }

  };




  // ==========================
  // LOGOUT
  // ==========================

  const logout = async () => {

    try {


      const res = await authFetch(
        `${API_BASE_URL}/auth/logout`,
        {
          method: "POST",
        }
      );


      const data = await res.json();


      setUser(null);



      if (data?.csrfToken) {

        setCsrfToken(data.csrfToken);
        csrfPromiseRef.current = null;

      } else {

        csrfPromiseRef.current = null;

        await refreshCsrf();
      }



    } catch (err) {

      console.error(
        "Logout failed:",
        err
      );


      setUser(null);


      csrfPromiseRef.current = null;

    }

  };




  // ==========================
  // INITIAL AUTH CHECK
  // ==========================

  useEffect(() => {

    const init = async () => {

      try {

        await refreshCsrf();

        await refreshUser();


      } finally {

        setLoading(false);

      }

    };


    init();


  }, []);





  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        csrfToken,

        authFetch,

        refreshUser,
        refreshCsrf,

        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};