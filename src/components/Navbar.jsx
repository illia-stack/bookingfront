import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

import { logout } from "../api/auth";

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
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          BookingApp
        </Link>

        {/* DESKTOP LINKS */}
        <div className="nav-links desktop">

          <Link to="/">{translations[lang].home}</Link>

          {token ? (
            <>
              <Link to="/my-bookings">
                {translations[lang].myBookings}
              </Link>

              <button onClick={handleLogout} className="nav-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">{translations[lang].login}</Link>
              <Link to="/register">{translations[lang].register}</Link>
            </>
          )}

          {/* LANGUAGE SELECT */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{
              width: "auto",
              padding: "4px",
              marginLeft: "10px"
            }}
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

              <button onClick={() => { handleLogout(); closeMobile(); }}>
                Logout
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

          {/* LANGUAGE MOBILE */}
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