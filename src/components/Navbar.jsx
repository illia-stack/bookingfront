import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../api/auth";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Navbar() {
  const { lang, changeLang } = useLanguage();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Sicherer Zugriff auf LocalStorage
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const token = localStorage.getItem("token");
  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  // Helper-Funktion: generiert die Links abhängig vom Auth-Status
  const renderLinks = () => {
    if (token) {
      return (
        <>
          <Link to="/my-bookings" onClick={closeMobile}>
            {translations[lang].myBookings}
          </Link>

          {isAdmin && (
            <Link to="/admin" onClick={closeMobile}>
              Admin Dashboard
            </Link>
          )}

          <button onClick={handleLogout}>
            {translations[lang].logout}
          </button>
        </>
      );
    }

    return (
      <>
        <Link to="/login" onClick={closeMobile}>
          {translations[lang].login}
        </Link>
        <Link to="/register" onClick={closeMobile}>
          {translations[lang].register}
        </Link>
      </>
    );
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMobile}>
          {translations[lang].logo}
        </Link>

        {/* DESKTOP NAV */}
        <div className="nav-links desktop">
          <Link className="nav-link" to="/">
            {translations[lang].home}
          </Link>

          {renderLinks()}

          {/* LANGUAGE SELECT */}
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
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={closeMobile}>
            {translations[lang].home}
          </Link>

          {renderLinks()}

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
        </div>
      )}
    </nav>
  );
}