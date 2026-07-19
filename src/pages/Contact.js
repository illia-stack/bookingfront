import { useState } from "react";
import { sendContact } from "../api/contact";
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
    if (submitLoading) return;
    e.preventDefault();

    setSubmitLoading(true);
    setStatus(null);

    try {

      const data = await sendContact(form);

      if (data.success) {

        setStatus("success");

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

      } else {

        setStatus("error");

      }

    } catch (err) {

      console.error(err);
      setStatus("error");

    } finally {

      setSubmitLoading(false);

    }
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
              disabled={submitLoading}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder={translations[lang].email}
              value={form.email}
              disabled={submitLoading}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder={translations[lang].subject}
              value={form.subject}
              disabled={submitLoading}
              onChange={handleChange}
            />


             
            <div className="textarea-wrapper">
              <textarea
                name="message"
                value={form.message}
                disabled={submitLoading}
                onChange={handleChange}
                rows="5"
                required
              />
              
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