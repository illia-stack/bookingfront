import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {

  const { isAdmin, isAuthenticated, logout } = useAuth();
  const { lang, changeLang } = useLanguage();  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);  

 

  const handleLogout = async () => {

    try {
      await logout();
    } catch (err) {
      console.error(err);
    }

    
    
    navigate("/");
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

          {isAuthenticated ? (
            <>

              <Link className="nav-link" to="/my-bookings">
                  {translations[lang].myBookings}
              </Link>

              {isAdmin && (
                  <Link
                      className="nav-link"
                      to="/admin"
                  >
                      Admin Dashboard
                  </Link>
              )}

              <button
                  className="btn-secondary"
                  onClick={handleLogout}
              >
                  {translations[lang].logout}
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
              closeMobile();
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
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mobile-menu">
          <div className="nav-links">

                <Link to="/" className="nav-item" onClick={closeMobile}>
                  {translations[lang].home}
                </Link>

                <Link to="/contact" className="nav-item" onClick={closeMobile}>
                  {translations[lang].contact}
                </Link>

                      {isAuthenticated ? (
                <>

                    <Link to="/my-bookings" className="nav-item" onClick={closeMobile}>
                        {translations[lang].myBookings}
                    </Link>

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="nav-item"
                            onClick={closeMobile}
                        >
                            Admin Dashboard
                        </Link>
                    )}

                    <button className="nav-item" onClick={handleLogout}>
                        {translations[lang].logout}
                    </button>
              
                </>
            ) : (
                <>

                    <Link to="/login" className="nav-item" onClick={closeMobile}>
                        {translations[lang].login}
                    </Link>

                    <Link to="/register" className="nav-item" onClick={closeMobile}>
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