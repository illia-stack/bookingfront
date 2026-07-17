import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {

  const [loggingOut, setLoggingOut] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, changeLang } = useLanguage();  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); 
  const closeMenu = () => setMenuOpen(false);


  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };


  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* LOGO */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          {translations[lang].logo}
        </Link>

        {/* DESKTOP NAV */}
        <div className="nav-links desktop">

          <Link className="nav-link" to="/">
            {translations[lang].home}
          </Link>

          <Link className="nav-link" to="/contact">
            {translations[lang].contact}
          </Link>

                        

              


          {loading ? (
            <span className="nav-link" style={{ opacity: 0.6 }}>
              Loading...
            </span>
          ) : user ? (
            <>
              <span className="nav-link">👤 {user?.name || "User"}</span>
              <Link className="nav-link" to="/my-bookings">
                  {translations[lang].myBookings}
              </Link>

              {user?.role === "admin" && (
                <button className="nav-btn" onClick={() => handleNavigate("/admin")}>
                  Admin
                </button>
              )}

              <button
                className="nav-item"
                disabled={loggingOut}
                onClick={async () => {
                  setLoggingOut(true);
                  try {
                    await logout();
                    navigate("/", { replace: true });
                    setMenuOpen(false);
                  } catch (err) {
                    console.error("Logout failed", err);
                    alert("Logout failed. Please try again.");
                  } finally {
                    setLoggingOut(false);
                  }
                }}
              >
                {loggingOut ? "..." : "Logout"}
              </button>

            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                {translations[lang].login}
              </Link>

              <Link className="nav-link" to="/register">
                {translations[lang].register}
              </Link>
            </>
          )}


          {/* LANGUAGE SELECT */}
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => {
              changeLang(e.target.value);
              closeMenu();
            }}
            aria-label="Language"
          >
            <option value="de">DE</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="mobile-btn"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="nav-links">

                <Link to="/" className="nav-item" onClick={closeMenu}>
                  {translations[lang].home}
                </Link>

                <Link to="/contact" className="nav-item" onClick={closeMenu}>
                  {translations[lang].contact}
                </Link>

                {loading ? (
                  <span className="nav-link" style={{ opacity: 0.6 }}>
                    Loading...
                  </span>
                ) : user ? (
                  <>
                    <span className="nav-link">👤 {user?.name || "User"}</span>
                    <Link className="nav-link" to="/my-bookings">
                        {translations[lang].myBookings}
                    </Link>

                    {user?.role === "admin" && (
                      <button className="nav-btn" onClick={() => handleNavigate("/admin")}>
                        Admin
                      </button>
                    )}

                    <button
                      className="nav-item"
                      disabled={loggingOut}
                      onClick={async () => {
                        setLoggingOut(true);
                        try {
                          await logout();
                          navigate("/", { replace: true });
                          setMenuOpen(false);
                        } catch (err) {
                          console.error("Logout failed", err);
                          alert("Logout failed. Please try again.");
                        } finally {
                          setLoggingOut(false);
                        }
                      }}
                    >
                      {loggingOut ? "..." : "Logout"}
                    </button>

                  </>
                ) : (
                  <>
                    <Link className="nav-link" to="/login">
                      {translations[lang].login}
                    </Link>

                    <Link className="nav-link" to="/register">
                      {translations[lang].register}
                    </Link>
                  </>
                )}

          </div>


          <div className="nav-actions">
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => changeLang(e.target.value)}
              aria-label="Language"
            >
              <option value="de">DE</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>

          
        </div>
      )}

    </nav>
  );
}