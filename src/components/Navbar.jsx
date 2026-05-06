import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { lang, setLang } = useLanguage();

  return (
    <nav className="navbar">

      <div className="nav-container">

        {/* 🏠 Logo */}
        <Link to="/" className="logo">
          BookingApp
        </Link>

        {/* 💻 Desktop Navigation */}
        <div className="nav-links desktop">
          <Link to="/">Home</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/login">Login</Link>
        </div>

        {/* 🌍 Language Switcher */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{
            marginLeft: "15px",
            padding: "6px",
            borderRadius: "6px"
          }}
        >
          <option value="de">DE</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>

        {/* 📱 Mobile Button */}
        <button className="mobile-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>

      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="mobile-menu">

          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/my-bookings" onClick={() => setOpen(false)}>My Bookings</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>

        </div>
      )}

    </nav>
  );
}