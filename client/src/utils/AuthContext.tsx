import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

const AuthContext = createContext();
const socket = io("http://localhost:3001");

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Изначально null, чтобы ожидать загрузку
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(!!storedUsername); // Устанавливаем isLoggedIn на основе localStorage
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    socket.emit("logout");
    localStorage.removeItem("username");
    navigate("/#/login");
  };

  const updateUsername = () => {
    const storedUsername = AuthService.getUsername();
    setUsername(storedUsername);
  };

  const storageListener = (event) => {
    if (event.key === "username") {
      updateUsername();
    }
  };

  useEffect(() => {
    updateUsername();

    window.addEventListener("storage", storageListener);

    socket.on("username-update", (username) => {
      setUsername(username);
    });

    return () => {
      window.removeEventListener("storage", storageListener);
      socket.off("username-update");
    };
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // Рендерим индикатор загрузки до установления isLoggedIn
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
