import { useState } from "react";
import api from "../api/api"; // Axios Client
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

export default function Contact() {
  const { lang } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setStatus(null);

    try {
      const res = await api.post("/contact", form);

      if (res.data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }

    setSubmitLoading(false);
  };

  return (
    <div className="contact-page">
        <div className="contact-card">
          <h1 className="contact-title">{translations[lang].contact}</h1>

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder={translations[lang].name}
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder={translations[lang].email}
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder={translations[lang].subject}
              value={form.subject}
              onChange={handleChange}
            />


             {/* Textarea mit Wrapper für zentrierten Placeholder */}
            <div className="textarea-wrapper">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                required
              />
              {/* Der span ersetzt den Platzhalter */}
              {form.message === "" && (
                <span className="textarea-placeholder">
                  {translations[lang].message}
                </span>
              )}
            </div>


            <button type="submit" disabled={submitLoading}>
              {submitLoading ? "..." : translations[lang].send}
            </button>
          </form>

          {status === "success" && (
            <p className="success-text">{translations[lang].sendSuccess}</p>
          )}
          {status === "error" && (
            <p className="error-text">{translations[lang].sendError}</p>
          )}
        </div>
    </div>
  );


}