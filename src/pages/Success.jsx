import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Success() {
  const { lang } = useLanguage();

  return (
    <div className="container">
      <h1>✔ {translations[lang].pay} successful</h1>
    </div>
  );
}