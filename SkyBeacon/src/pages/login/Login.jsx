import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "../../components/Button.jsx";
import Message from "../../components/Message.jsx";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", { username, password });
    if (username && password) {
      const userData = { username, password };
      try {
        await onLogin(userData);
        setMessage("");
      } catch (error) {
        setMessage("Login failed. Please check your credentials.");
      }
    } else {
      setMessage("Please enter both username and password.");
    }
  };

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setTimeout(() => {
        navigate(location.pathname, { replace: true, state: null });
      }, 100);
    }
  }, [location, navigate]);

  return (
    <div className="login-container">
      <h2>ADMIN LOGIN</h2>
      <Message text={message} onClose={() => setMessage(null)} />
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" text="Login" />
      </form>
    </div>
  );
}

export default Login;
