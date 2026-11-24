import { useState } from "react";
import "./Login.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    const found = {};
    if (!form.email.trim()) found.email = "Enter your email address.";
    else if (!EMAIL_PATTERN.test(form.email)) found.email = "Enter a valid email, like name@example.com.";
    if (!form.password) found.password = "Enter your password.";
    else if (form.password.length < 6) found.password = "Password must be at least 6 characters.";
    return found;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setLoading(true);
    setServerError("");
    try {
      // TODO: replace this fake delay with your real API call, e.g.
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Invalid credentials");
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Logged in with:", form);
    } catch (err) {
      setServerError("Email or password is incorrect. Check them and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <aside className="login__panel" aria-hidden="true">
        <div className="login__rings">
          <span />
          <span />
          <span />
        </div>
        <p className="login__panel-text">Pick up right where you left off.</p>
      </aside>

      <section className="login__side">
        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <h1 className="login__title">Welcome back</h1>
          <p className="login__subtitle">Log in to your account to continue.</p>

          {serverError && (
            <div className="login__alert" role="alert">
              {serverError}
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span className="field__error" id="email-error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="field">
            <div className="field__row">
              <label htmlFor="password">Password</label>
              <a href="/forgot-password" className="link">
                Forgot password?
              </a>
            </div>
            <div className="field__password">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                className="field__toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 6.1A9.8 9.8 0 0112 6c5 0 8.5 4.2 9.5 6-.4.8-1.3 2-2.6 3.2M6.5 7.6C4.4 9 3 11 2.5 12c1 1.8 4.5 6 9.5 6 1.5 0 2.8-.4 4-.9" />
                    <path d="M9.9 9.9a3 3 0 004.2 4.2" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 12C3.5 10.2 7 6 12 6s8.5 4.2 9.5 6c-1 1.8-4.5 6-9.5 6S3.5 13.8 2.5 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="field__error" id="password-error">
                {errors.password}
              </span>
            )}
          </div>

          <label className="check">
            <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} />
            <span>Keep me logged in</span>
          </label>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? (
              <>
                <span className="btn__spinner" aria-hidden="true" />
                Logging in…
              </>
            ) : (
              "Log in"
            )}
          </button>
          <button type="submit" className="btn" style={{background: 'red'}} disabled={loading}>
           
              Clear
          </button>

          <p className="login__footer">
            New here?{" "}
            <a href="/signup" className="link">
              Create an account
            </a>
          </p>
        </form>
      </section>
    </main>
  );
}