import { useEffect, useState } from "react";
// import { getProperties } from "../services/property"; // Backend temporär aus

export default function Home() {
  const [properties, setProperties] = useState([]);

  // Dummy-Daten nur für Test
  useEffect(() => {
    const dummyProperties = [
      { id: 1, title: "Test House", city: "Berlin", price_per_night: 50 },
      { id: 2, title: "Beach Villa", city: "Barcelona", price_per_night: 120 },
      { id: 3, title: "Mountain Cabin", city: "Zermatt", price_per_night: 80 },
    ];
    setProperties(dummyProperties);

    // Wenn Backend testen willst, später wieder einkommentieren
    // getProperties().then((res) => {
    //   setProperties(res.data.data.data);
    // });
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginBottom: "20px" }}>Properties</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" }}>
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