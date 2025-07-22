import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://medical-backend-teal.vercel.app/api/users/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

      localStorage.setItem("token", token);
      localStorage.setItem("token_expiry", expiresAt);
      localStorage.setItem("user", JSON.stringify(user));

      alert(`✅ Welcome ${user.name}! You are logged in as ${user.role}.`);

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "customer" || user.role === "user") {
        navigate("/home");
      } else {
        navigate("/");
      }

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiry");
        localStorage.removeItem("user");
        alert("Session expired. Please log in again.");
        navigate("/loginIn");
      }, 60 * 60 * 1000);
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setErrorMessage(message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login to Your Account</h2>

        {errorMessage && (
          <div style={styles.errorBox}>{errorMessage}</div>
        )}

        <form onSubmit={handleLogin} style={styles.form} autoComplete="on">
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
            autoComplete="email"
          />

          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            autoComplete="current-password"
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.registerText}>
          Don’t have an account?{" "}
          <Link to="/" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #cce5ff, #e6f2ff)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#007bff",
  },
  errorBox: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    borderRadius: "6px",
    padding: "10px",
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "500",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  registerText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default LoginIn;
