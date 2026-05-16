import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Register() {

  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Fehler-State hinzufügen

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Form-Submit Standard verhindern
    setLoading(true);
    setError(""); // vorherigen Fehler zurücksetzen

    try {
      await register(form);
      navigate("/"); // Zurück zur Startseite
    } catch (err) {
      setError(err.response?.data?.message || translations[lang].registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">

      {/* TITLE */}
      <h2 className="center">
        {translations[lang].register}
      </h2>

      {/* ERROR MESSAGE */}
      {error && <p className="error-text">{error}</p>}

      {/* FORM */}
      <form onSubmit={handleRegister}>

        {/* NAME */}
        <input
          name="name"
          placeholder={translations[lang].name}
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* EMAIL */}
        <input
          name="email"
          type="email"
          placeholder={translations[lang].email}
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder={translations[lang].password}
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* REPEAT PASSWORD */}
        <input
          name="password_confirmation"
          type="password"
          placeholder={translations[lang].repeatPassword}
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />

        {/* BUTTON */}
        <button
          className="btn-full"
          type="submit"
          disabled={loading}
        >
          {loading ? translations[lang].loading : translations[lang].register}
        </button>

      </form>
    </div>
  );
}