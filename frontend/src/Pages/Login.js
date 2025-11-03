import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }
    try {
      const url = "http://localhost:8000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      const { success, message, jwttoken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwttoken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details || message);
      } else {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  // Define style sets for light and dark
  const themeStyles = {
    light: {
      container: {
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem 1.5rem", // top/bottom 2rem, left/right 1.5rem
        backgroundColor: "#f7f7f7",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      },
      input: {
        padding: "0.75rem 1rem",
        fontSize: "1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        color: "#000",
      },
      button: {
        padding: "0.85rem", // slightly more vertical padding
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007bff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background 0.3s ease",
      },
      linkText: {
        textAlign: "center",
        marginTop: "1.5rem", // more space above link text
        color: "#555",
      },
    },
    dark: {
      container: {
        maxWidth: "400px",
        margin: "2rem auto",
        padding: "2rem 1.5rem",
        backgroundColor: "#1e1e1e",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        fontFamily: "Arial, sans-serif",
        color: "#ddd",
      },
      input: {
        padding: "0.85rem 1.1rem", // more comfortable padding
        fontSize: "1rem",
        border: "1px solid #444",
        borderRadius: "4px",
        backgroundColor: "#2a2a2a",
        color: "#fff",
      },
      button: {
        padding: "0.9rem",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#0d6efd",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background 0.3s ease",
      },
      linkText: {
        textAlign: "center",
        marginTop: "1.5rem",
        color: "#aaa",
      },
    },
  };

  const styles = isDark ? themeStyles.dark : themeStyles.light;

  return (
    <div style={styles.container}>
      <h1
        style={{ textAlign: "center", marginBottom: "2rem", fontWeight: 600 }}
      >
        Login
      </h1>
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <button
          onClick={() => setIsDark((prev) => !prev)}
          style={{
            padding: "0.25rem 0.5rem",
            fontSize: "0.9rem",
            cursor: "pointer",
            backgroundColor: isDark ? "#444" : "#eee",
            color: isDark ? "#fff" : "#000",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {isDark ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
      >
        <div>
          <label
            htmlFor="email"
            style={{ fontWeight: 500, color: styles.linkText.color }}
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
            placeholder="Enter your Email..."
            style={styles.input}
            autoFocus
          />
        </div>

        <div>
          <label
            htmlFor="password"
            style={{ fontWeight: 500, color: styles.linkText.color }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
            placeholder="Enter your password..."
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
        <span style={styles.linkText}>
          Don’t have an account?{" "}
          <Link
            to={"/signup"}
            style={{ color: isDark ? "#80bdff" : "#007bff" }}
          >
            Signup
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
