import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { useAuth } from "../../utils/AuthContext";
import "./styles.css";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    if (!username || !password) {
      setErrorMessage("Username and password are required");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    try {
      await AuthService.login(username, password);
      navigate("/documents");
    } catch (error) {
      setErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={loginHandler}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </form>
        <p>
          Don't have an account? <a href="/#/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
