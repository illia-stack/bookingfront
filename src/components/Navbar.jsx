import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/auth";
import { logout } from "../api/auth";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Navbar() {

  const { lang, changeLang } = useLanguage();
  const location = useLocation();  
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get("/user");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, [location]);

  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
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

          {user ? (
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

          <Link to="/contact" onClick={closeMobile}>
            {translations[lang].contact}
          </Link>

                {user  ? (
          <>

              <Link to="/my-bookings" onClick={closeMobile}>
                  {translations[lang].myBookings}
              </Link>

              {isAdmin && (
                  <Link
                      to="/admin"
                      onClick={closeMobile}
                  >
                      Admin Dashboard
                  </Link>
              )}

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