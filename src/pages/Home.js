import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../api/property";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Home() {

  const { lang } = useLanguage();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCity, setSelectedCity] = useState("");

  const loadProperties = async () => {
      try {
          const res = await getProperties();
          setProperties(res.data);
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
  }; 

  useEffect(() => {
      loadProperties();
  }, []);

  const cities = [...new Set(properties.map(property => property.city))];

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
    <div>
      {/* DROPDOWN FILTER */}
      <div className="filter-wrapper">
        <div className="filter-container">
          <label htmlFor="city-select">{translations[lang].selectCity}</label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">{translations[lang].allCities}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PROPERTY LIST */}
      <div className="container">
        <div className="properties-grid">
          {properties
            .filter(property => !selectedCity || property.city === selectedCity)
            .map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          }
        </div>
      </div>
    </div>
  );
}