import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../api/auth";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Navbar() {

  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = async () => {

    try {
      await logout();
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("token");
    navigate("/login");
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* LOGO */}
        <Link
          to="/"
          className="logo"
          onClick={closeMobile}
        >
          BookingApp
        </Link>

        {/* DESKTOP NAV */}
        <div className="nav-links desktop">

          <Link className="nav-link" to="/">
            {translations[lang].home}
          </Link>

          {token ? (
            <>
              <Link className="nav-link" to="/my-bookings">
                {translations[lang].myBookings}
              </Link>

              <button
                className="btn-secondary"
                onClick={handleLogout}
              >
                {translations[lang].logout}
              </button>
            </>
          ) : (
            <>
              <Link className="btn-link" to="/login">
                {translations[lang].login}
              </Link>

              <Link className="btn-primary-small" to="/register">
                {translations[lang].register}
              </Link>
            </>
          )}

          {/* LANGUAGE SELECT */}
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
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

          {token ? (
            <>
              <Link to="/my-bookings" onClick={closeMobile}>
                {translations[lang].myBookings}
              </Link>

              <button onClick={handleLogout}>
                {translations[lang].logout}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMobile}>
                {translations[lang].login}
              </Link>

              <Link to="/register" onClick={closeMobile}>
                {translations[lang].register}
              </Link>
            </>
          )}

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
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