import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/languages";

function Register() {
  
  const { login, authFetch, loading: authLoading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { lang } = useLanguage();

  const handleRegister = async () => {
   if (loading) return;

    
    setLoading(true);

    try {
      // ✅ Use centralized fetch
      const res = await authFetch(`${API_BASE_URL}/register.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password }),
      });

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Unexpected server response");
      }

      const data = await res.json().catch(() => {
        throw new Error("Invalid server response");
      });

      if (!res.ok) {
        if (data?.errors) {
          setErrors(data.errors);
          return;
        }
        throw new Error(data?.message || "Registration failed");
      }
      
      setErrors({});


      alert(translations[lang].registrationSuccess);

      // ✅ Let AuthContext re-sync from backend
      await login();

      navigate("/", { replace: true });

    } catch (err) {

        if (err.message === "SESSION_EXPIRED") {
          alert("Session expired. Please refresh the page.");
          window.location.reload();
          return;
        }

        if (err.message === "UNAUTHORIZED") {
          alert(translations[lang].registrationFailed);
          return;
        }

        // ✅ Fallback 
        alert(translations[lang].registrationFailed);   

    } finally {
          setLoading(false);
      }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <h2>{translations[lang].register}</h2>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >

          
          {errors.general && (
            <div className="error">
              {errors.general.map((err, i) => <div key={i}>{err}</div>)}
            </div>
          )}



          <input
            type="text"
            placeholder={translations[lang].namePlaceholder}
            value={name}
            disabled={loading}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: undefined, general: undefined }));
            }}
            required
          />

          {errors.name && (
            <div className="error">
              {errors.name.map((err, i) => <div key={i}>{err}</div>)}
            </div>
          )}



          <input
            type="email"
            placeholder={translations[lang].emailPlaceholder}
            value={email}
            disabled={loading}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined, general: undefined }));
            }}
            required
          />

          {errors.email && (
            <div className="error">
              {errors.email.map((err, i) => <div key={i}>{err}</div>)}
            </div>
          )}




          <div className="password-field">

            <input
              type={showPassword ? "text" : "password"}
              placeholder={translations[lang].passwordPlaceholder}
              value={password}
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
              }}
              required
            />


            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
            {showPassword
              ? translations[lang].hide
              : translations[lang].show}            
            </button>
          
          </div>

          {errors.password && (
            <div className="error">
              {errors.password.map((err, i) => <div key={i}>{err}</div>)}
            </div>
          )}




          <button className="auth-btn" type="submit"  disabled={loading}>
            {loading
              ? translations[lang].loading
              : translations[lang].register}
          </button>


        </form>



        <div className="auth-switch">
          {translations[lang].alreadyHaveAccount}
          <span
            className="auth-link"
            onClick={() => navigate("/login")}
          >
            {translations[lang].login}
          </span>
        </div>

      </div>
    </div>

  );

}

export default Register;