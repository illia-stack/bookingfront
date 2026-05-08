import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function MyBookings() {

  const { lang } = useLanguage();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // STATUS ÜBERSETZUNG
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

  // LOADING
  if (loading) {
    return (
      <div className="container">
        <p>{translations[lang].loading}</p>
      </div>
    );
  }

  // EMPTY
  if (!loading && bookings.length === 0) {
    return (
      <div className="container">
        <p>{translations[lang].noBookings}</p>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>{translations[lang].myBookings}</h1>

      {bookings.map((b) => (

        <div key={b.id} className="card">

          <h3>{b.property.title}</h3>

          <p>
            📍 {b.property.city}
          </p>

          <p>
            {translations[lang].checkIn}: {b.check_in}
          </p>

          <p>
            {translations[lang].checkOut}: {b.check_out}
          </p>

          <p>
            💰 {b.total_price} €
          </p>

          <p>
            {statusLabel(b.status)}
          </p>

        </div>
      ))}

    </div>
  );
}