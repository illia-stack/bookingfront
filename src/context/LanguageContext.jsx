import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("de");

  // zentrale Sprachwechsel-Funktion, speichert direkt im localStorage
  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLang(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (["de", "en", "es"].includes(browserLang)) {
        setLang(browserLang);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}