// frontend_react/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { getProperties } from "../api/propertyApi";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Axios Call zum Backend
    getProperties()
      .then((res) => {
        console.log("Backend Antwort:", res.data); // nur zum Debuggen
        // Daten setzen, falls vorhanden
        if (res.data && res.data.data && res.data.data.data) {
          setProperties(res.data.data.data);
        } else {
          // Fallback, falls Backend falsche Struktur liefert
          setProperties([
            { id: 1, title: "Test House", city: "Berlin", price_per_night: 50 },
          ]);
        }
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Properties:", err);
        // Fallback Dummy-Daten
        setProperties([
          { id: 1, title: "Test House", city: "Berlin", price_per_night: 50 },
        ]);
      });
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginBottom: "20px" }}>Properties</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
        }}
      >
        {properties.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.city}</p>
            <p>{p.price_per_night} € / night</p>
          </div>
        ))}
      </div>
    </div>
  );
}