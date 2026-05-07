import { Link, useSearchParams } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Cancel() {

  const { lang } = useLanguage();

  const [searchParams] = useSearchParams();

  const bookingId = searchParams.get("booking_id");

  return (
    <div className="container">

      <h1 style={{ color: "red" }}>
        ❌ {translations[lang].paymentCancelledTitle}
      </h1>

      <p>
        {translations[lang].paymentCancelledMessage}
      </p>

      {bookingId && (
        <p>
          {translations[lang].bookingId}: <strong>#{bookingId}</strong>
        </p>
      )}

      <p>
        {translations[lang].tryAgainLater}
      </p>

      <Link to="/my-bookings">
        <button>
          {translations[lang].backToBookings}
        </button>
      </Link>

    </div>
  );
}