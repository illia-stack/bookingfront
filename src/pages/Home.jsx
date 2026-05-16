import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import api from "../api/client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Home() {

  const { lang } = useLanguage();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProperties = async () => {
    try {
      const res = await api.get("/properties");
      setProperties(res.data.data.data || res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">{translations[lang].loading}</p>
      </div>
    );
  }

  // EMPTY
  if (!loading && properties.length === 0) {
    return (
      <div className="loading-container">
        <p>{translations[lang].noProperties}</p>
      </div>
    );
  }

  return (
    <div className="properties-grid">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}