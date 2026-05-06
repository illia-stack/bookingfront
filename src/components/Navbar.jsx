// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">BookingApp</Link>

        <div className="nav-links desktop">
          <Link to="/">{translations[lang].home}</Link>
          <Link to="/login">{translations[lang].login}</Link>
          <Link to="/my-bookings">{translations[lang].myBookings}</Link>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="de">DE</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>

        <button className="mobile-btn" onClick={toggleMobile}>
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMobileOpen(false)}>{translations[lang].home}</Link>
          <Link to="/login" onClick={() => setMobileOpen(false)}>{translations[lang].login}</Link>
          <Link to="/my-bookings" onClick={() => setMobileOpen(false)}>{translations[lang].myBookings}</Link>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="de">DE</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>
      )}
    </nav>
  );
}