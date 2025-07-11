import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("✅ Registered successfully! Redirecting to login...");
        // Optional: Clear the form
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "customer",
        });
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/loginIn");
        }, 2000);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Registration failed. Please try again.";
      console.error("Registration error:", errorMsg);

      if (errorMsg.toLowerCase().includes("already exists")) {
        setErrorMessage("⚠️ User already registered. Please login.");
      } else {
        setErrorMessage(errorMsg);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Your Account</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={styles.input}
            required
          />

          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={styles.input}
            autoComplete="username"
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            style={styles.input}
            autoComplete="current-password"
            required
          />

          <button type="submit" style={styles.button}>
            Register
          </button>

          {successMessage && (
            <div style={styles.success}>
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div style={styles.error}>
              {errorMessage}
              <br />
              <Link to="/loginIn" style={styles.link}>
                Already have an account? Login
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "35px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  label: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#444",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  button: {
    padding: "14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  success: {
    marginTop: "12px",
    color: "#155724",
    backgroundColor: "#d4edda",
    border: "1px solid #c3e6cb",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
  },
  error: {
    marginTop: "12px",
    color: "#721c24",
    backgroundColor: "#f8d7da",
    border: "1px solid #f5c6cb",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    display: "block",
    marginTop: "10px",
    fontSize: "14px",
    color: "#007bff",
    textDecoration: "underline",
  },
};

export default Register;
