import React, { useState } from "react";
import "./Login.css";
import Button from "../../components/Button.jsx";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form submitted", { username, password });
  if (username && password) {
    const userData = { username, password };
    onLogin(userData);
  } else {
    alert("Please enter both username and password.");
  }
};

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className = "form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className = "form-group">
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
