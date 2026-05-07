import { useState } from "react";
import { login } from "../api/auth";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Login() {

  const { lang } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px" }}>

      <h2>{translations[lang].login}</h2>

      <input
        placeholder={translations[lang].email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder={translations[lang].password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        {translations[lang].login}
      </button>

    </div>
  );
}