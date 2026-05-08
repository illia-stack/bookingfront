import { useState } from "react";
import { register } from "../api/auth";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await register(form);
      alert(translations[lang].registrationSuccess);
      window.location.href = "/";
    } catch (err) {
      alert(
        err.response?.data?.message ||
        translations[lang].registrationFailed
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>

      <h2>{translations[lang].register}</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
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

      <button onClick={handleRegister}>
        {translations[lang].register}
      </button>

    </div>
  );
}