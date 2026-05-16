import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Cancel() {

  const { lang, changeLang } = useLanguage();
  const [searchParams] = useSearchParams();

  const bookingId = searchParams.get("booking_id");
  const urlLang = searchParams.get("lang");

  // Sprache aus URL setzen, falls vorhanden
  useEffect(() => {
    if (urlLang && urlLang !== lang) {
      changeLang(urlLang);
    }
  }, [urlLang, lang, changeLang]);

  return (
    <div className="page-center">

      <div className="status-card status-cancel">

        {/* ICON + TITLE */}
        <div className="status-icon">❌</div>

        <h1>{translations[lang].paymentCancelledTitle}</h1>

        {/* MESSAGE */}
        <p className="muted">{translations[lang].paymentCancelledMessage}</p>

        {/* BOOKING ID */}
        {bookingId && (
          <p className="booking-id">
            {translations[lang].bookingId}: <strong>#{bookingId}</strong>
          </p>
        )}

        {/* INFO */}
        <p className="hint">{translations[lang].tryAgainLater}</p>

        {/* BUTTON */}
        <Link to="/my-bookings">
          <button className="primary-btn btn-full">
            {translations[lang].backToBookings}
          </button>
        </Link>

      </div>

    </div>
  );
}