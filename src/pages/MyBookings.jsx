import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function MyBookings() {

  const { lang } = useLanguage();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // STATUS LABEL HELPER
  const statusLabel = (status) => {
    if (!status) return "";
    const key = `status${status.charAt(0).toUpperCase()}${status.slice(1)}`;
    return translations[lang][key] || status;
  };

  useEffect(() => {
    let mounted = true;

    getMyBookings()
      .then((res) => {
        if (mounted) setBookings(res.data.data || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  /* LOADING STATE */
  if (loading) {
    return (
      <div className="page-center">
        <p className="loading-text">{translations[lang].loading}</p>
      </div>
    );
  }

  /* EMPTY STATE */
  if (!bookings.length) {
    return (
      <div className="page-center">
        <div className="empty-box">
          <h2>{translations[lang].noBookings}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <h1 className="page-title">{translations[lang].myBookings}</h1>

      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">

            {/* PROPERTY TITLE */}
            <h3>{booking.property?.title || "-"}</h3>

            {/* CITY */}
            <p className="muted">📍 {booking.property?.city || "-"}</p>

            {/* DATES */}
            <div className="dates">
              <p>{translations[lang].checkIn}: <strong>{booking.check_in}</strong></p>
              <p>{translations[lang].checkOut}: <strong>{booking.check_out}</strong></p>
            </div>

            {/* PRICE */}
            <p className="price">💰 {booking.total_price} €</p>

            {/* STATUS BADGE */}
            <span className={`status status-${booking.status}`}>
              {statusLabel(booking.status)}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}