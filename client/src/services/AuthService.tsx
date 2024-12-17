import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:3001");

const AuthService = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      socket.emit("login", { username, password });

      socket.on("loginSuccess", (response) => {
        if (response.username) {
          localStorage.setItem("username", response.username);
          resolve(response);
        } else {
          reject(new Error("Login failed. Please try again."));
        }
      });

      socket.on("error", (error) => {
        console.error("Login error:", error);
        reject(new Error("Login failed. Please try again."));
      });
    });
  },

  getUsername: () => {
    return localStorage.getItem("username");
  },

  register: (username, password) => {
    return new Promise((resolve, reject) => {
      socket.emit("register", { username, password });

      socket.on("registerSuccess", (response) => {
        resolve(response);
      });

      socket.on("error", (error) => {
        console.error("Registration error:", error);
        reject(new Error("Registration failed. Please try again."));
      });
    });
  },

  logout: (navigate) => {
    socket.emit("logout");
    localStorage.removeItem("username");
    if (navigate) {
      navigate("/#/login"); // Переход на страницу логина
    }
  },
};

export default AuthService;
