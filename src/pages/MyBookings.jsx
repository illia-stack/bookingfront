import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function MyBookings() {

  const { lang } = useLanguage();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusLabel = (status) => {
    const key =
      `status${status.charAt(0).toUpperCase()}${status.slice(1)}`;

    return translations[lang]?.[key] || status;
  };

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setBookings([]);
      return;
    }

    getMyBookings()
      .then((res) => {
        setBookings(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load bookings");
        setBookings([]);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

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
        <p>{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
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

      <h1 className="page-title">
        {translations[lang].myBookings}
      </h1>

      <div className="bookings-grid">

        {bookings.map((b) => (

          <div key={b.id} className="booking-card">

            <h3>{b.property?.title}</h3>

            <p className="muted">
              📍 {b.property?.city}
            </p>

            <div className="dates">

              <p>
                {translations[lang].checkIn}:{" "}
                <strong>
                  {new Date(b.check_in).toLocaleDateString()}
                </strong>
              </p>

              <p>
                {translations[lang].checkOut}:{" "}
                <strong>
                  {new Date(b.check_out).toLocaleDateString()}
                </strong>
              </p>

            </div>

            <p className="price">
              💰 {b.total_price} €
            </p>

            <span className={`status status-${b.status}`}>
              {statusLabel(b.status)}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}