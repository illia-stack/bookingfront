import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function MyBookings() {

  const { lang } = useLanguage();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getMyBookings().then(res => {
      setBookings(res.data.data);
    });
  }, []);

  if (!bookings.length) {
    return <p>{translations[lang].noBookings}</p>;
  }

  return (
    <div className="container">

      <h1>{translations[lang].myBookings}</h1>

      {bookings.map((b) => (
        <div key={b.id} className="card">

          <h3>{b.property.title}</h3>

          <p>📍 {b.property.city}</p>

          <p>{translations[lang].checkIn}: {b.check_in}</p>
          <p>{translations[lang].checkOut}: {b.check_out}</p>

          <p>💰 {b.total_price} €</p>

          <p>{b.status}</p>

        </div>
      ))}

    </div>
  );
}