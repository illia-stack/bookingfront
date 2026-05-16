import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Login() {

  const { lang } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      await login(email, password);

      window.location.href = "/";

    } catch (err) {

      alert(
        err.response?.data?.message ||
        translations[lang].loginFailed
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* TITLE */}
        <h1 className="auth-title">
          {translations[lang].login}
        </h1>

        {/* SUBTITLE */}
        <p className="auth-subtitle">
          {translations[lang].loginWelcome}
        </p>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="auth-form"
        >

          {/* EMAIL */}
          <div className="form-group">

            <label>
              {translations[lang].email}
            </label>

            <input
              type="email"
              placeholder={translations[lang].email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          {/* PASSWORD */}
          <div className="form-group">

            <label>
              {translations[lang].password}
            </label>

            <input
              type="password"
              placeholder={translations[lang].password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="primary-btn"
          >
            {translations[lang].login}
          </button>

        </form>

      </div>

    </div>
  );
}