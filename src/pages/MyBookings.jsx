import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function MyBookings() {

  const { lang } = useLanguage();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // STATUS LABEL
  const statusLabel = (status) => {

    const key =
      `status${status.charAt(0).toUpperCase()}${status.slice(1)}`;

    return translations[lang][key] || status;
  };

  useEffect(() => {

    getMyBookings()
      .then((res) => {
        setBookings(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

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

          <div key={b.id} className="booking-card">

            {/* TITLE */}
            <h3>
              {b.property.title}
            </h3>

            {/* CITY */}
            <p className="muted">
              📍 {b.property.city}
            </p>

            {/* DATES */}
            <div className="dates">

              <p>
                {translations[lang].checkIn}:{" "}
                <strong>{b.check_in}</strong>
              </p>

              <p>
                {translations[lang].checkOut}:{" "}
                <strong>{b.check_out}</strong>
              </p>

            </div>

            {/* PRICE */}
            <p className="price">
              💰 {b.total_price} €
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