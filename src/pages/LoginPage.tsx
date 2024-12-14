import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import "./LoginPage.css";


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth(); // Access login from context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the backend login API using Axios
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username,
        password,
      }, {
        withCredentials: true, // Important for including the HTTP-only cookie
      });

      if (response.status === 200) {
        const data = response.data;

        // Store user information in localStorage
        const user = {
          id: data.id,
          username: data.username,
          email: data.email,
          roles: data.roles,
        };

        // Call login function in AuthContext to update global state
        login(user);

        // Redirect to home or another page after successful login
        navigate('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
