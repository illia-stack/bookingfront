import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import api from "../api/client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Home() {

  const { lang } = useLanguage();

  const [properties, setProperties] = useState([]);

  const getProperties = async () => {
    try {
      const res = await api.get("/properties");
      setProperties(res.data.data.data || res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div className="container">

      {properties.length === 0 ? (
        <p>{translations[lang].loading}</p>
      ) : (
        properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      )}

    </div>
  );
}