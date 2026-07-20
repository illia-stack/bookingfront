import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMyBookings } from "../api/booking";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function MyBookings() {

  const { authFetch, user } = useContext(AuthContext);
  const { lang } = useLanguage();


  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // STATUS LABEL
  const statusLabel = (status) => {
    if (!status) return "";
    const key =
      `status${status.charAt(0).toUpperCase()}${status.slice(1)}`;
    return translations[lang][key] || status;
  };

  const loadBookings = async () => {
    try {
      const res = await getMyBookings(authFetch);

      const data = Array.isArray(res.data) ? res.data : [];
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("BOOKINGS ERROR:", err);

      if (err?.status === 401) {
        window.location.href = "/login";
        return;
      }

      setError("errorLoadingBookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user === null) {
      setLoading(false);
      return;
    }

    loadBookings();
  }, [user]);


  const formatPrice = (price) =>
  new Intl.NumberFormat(lang, {
    style: "currency",
    currency: "EUR",
  }).format(price);

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return isNaN(d) ? "-" : d.toLocaleDateString(lang);
  };

  /* LOADING */
  if (loading) {
    return (
      <div className="page-center">
        <p className="loading-text">
          {translations[lang].loading}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-center">
        <div className="empty-box">
          <h2>{translations[lang]?.[error] || "Error"}</h2>
        </div>
      </div>
    );
  }

  /* EMPTY */
  if (!loading && bookings.length === 0) {
    return (
      <div className="page-center">
        <div className="empty-box">
          <h2>
            {translations[lang].noBookings}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-page">

      <h1 className="page-title">
        {translations[lang].myBookings}
      </h1>

      <div className="bookings-grid">

        {bookings.map((b) => (

          <div key={`${b.id}-${b.check_in}`} className="booking-card">

            {/* TITLE */}
            <h3>
              {b.title}
            </h3>

            {/* CITY */}
            <p className="muted">
              📍 {b.city}
            </p>

            {/* DATES */}
            <div className="dates">

              <p>
                {translations[lang].checkIn}:{" "}
                <strong>{formatDate(b.check_in)}</strong>
              </p>

              <p>
                {translations[lang].checkOut}:{" "}
                <strong>{formatDate(b.check_out)}</strong>
              </p>

            </div>

            {/* PRICE */}
            <p className="price">
              {formatPrice(b.total_price)}
            </p>

            {/* STATUS BADGE */}
            <span className={`status status-${b.status}`}>
              {statusLabel(b.status)}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}