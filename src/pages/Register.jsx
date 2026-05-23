import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await register(form);

      localStorage.setItem("token", res.token);

      setForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      });

      alert(translations[lang].registrationSuccess);

      navigate("/");

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

      <form onSubmit={handleRegister}>

        <input
          name="name"
          value={form.name}
          placeholder={translations[lang].name}
          onChange={handleChange}
        />

        <input
          name="email"
          value={form.email}
          type="email"
          placeholder={translations[lang].email}
          onChange={handleChange}
        />

        <input
          name="password"
          value={form.password}
          type="password"
          placeholder={translations[lang].password}
          onChange={handleChange}
        />

        <input
          name="password_confirmation"
          value={form.password_confirmation}
          type="password"
          placeholder={translations[lang].repeatPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn-full"
          disabled={loading}
        >
          {loading
            ? translations[lang].loading
            : translations[lang].register}
        </button>

      </form>

    </div>
  );
}