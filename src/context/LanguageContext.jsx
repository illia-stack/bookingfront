import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("de"); // default Deutsch

  // Funktion zum Sprachwechsel, speichert auch im localStorage
  const changeLang = (newLang) => {
    if (!newLang) return;
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");

    if (savedLang && ["de", "en", "es"].includes(savedLang)) {
      setLang(savedLang);
    } else if (typeof navigator !== "undefined" && navigator.language) {
      const browserLang = navigator.language.slice(0, 2);
      if (["de", "en", "es"].includes(browserLang)) {
        setLang(browserLang);
      }
    }
    // fallback bleibt "de"
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom Hook für einfachere Nutzung im Frontend
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}