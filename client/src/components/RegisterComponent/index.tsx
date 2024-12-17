import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import "./styles.css";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username and password are required");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    try {
      await AuthService.register(username, password);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Registration failed");
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
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
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </form>
        <p>
          Have an account? <a href="/#/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
