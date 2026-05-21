import { useState } from "react";
import { register } from "../api/api";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Register() {

  const { lang } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await register(form);

      alert(translations[lang].registrationSuccess);

      window.location.href = "/";

    } catch (err) {
      alert(
        err.response?.data?.message ||
        translations[lang].registrationFailed
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">

      <h2 className="center">
        {translations[lang].register}
      </h2>

      <input
        name="name"
        placeholder={translations[lang].name}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder={translations[lang].email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder={translations[lang].password}
        onChange={handleChange}
      />

      <input
        name="password_confirmation"
        type="password"
        placeholder={translations[lang].repeatPassword}
        onChange={handleChange}
      />

      <button
        className="btn-full"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading
          ? translations[lang].loading
          : translations[lang].register}
      </button>

    </div>
  );
}