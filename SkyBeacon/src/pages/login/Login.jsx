import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../../components/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid username or password.");
        } else {
          setError("Login failed. Please try again.");
        }
        return;
      }

      const adminResponse = await fetch("http://localhost:8080/auth/adminConfirmation", {
        method: "GET",
        credentials: "include",
      });

      if (adminResponse.ok) {
        const admin = await adminResponse.json();
        console.log("Logged in as:", admin.username, admin.roles);
      }

      navigate("/dashboard/admin", { replace: true }); 
    } catch (err) {
      console.error("Error connecting to backend:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>ADMIN LOGIN</h2>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button
          text={loading ? "LOGGING IN..." : "LOGIN"}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Login;
