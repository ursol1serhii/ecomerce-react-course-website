import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};
export default function Auth() {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { user, signUp, logout, login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    setError(null);
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error ? result.error : "");
    }
    console.log(result);
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && (
            <>
              <p>User logged in {user.email}</p>
              <button onClick={logout}>Logout</button>
            </>
          )}
          <h1 className="page-title">
            {mode === "signup" ? "SIGN UP" : "Login"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 12,
                    message:
                      "Password must be not more than 12 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "SIGN UP" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
