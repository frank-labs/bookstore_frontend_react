import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        { username, password },
        {
          withCredentials: true, // Important! This tells Axios to include cookies in the request/response
        }
      );

      // Check if login was successful
      if (response.status === 200) {
        console.log("Logged in successfully!");
        navigate("/"); // Redirect to the home page or dashboard
      }
    } catch (err: any) {
      // Handle error
      setError(err.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="login-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
