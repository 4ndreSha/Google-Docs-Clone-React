import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import "./styles.css";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const isLogRef = useRef(false);
  const [isLoggingState, setIsLoggingState] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggingState(true);
      isLogRef.current = true;
    }
  }, []);

  useEffect(() => {
    setIsLoggingState(isLogRef.current);
  }, [isLoggedIn, isLogRef.current]);

  const handleDocumentsClick = () => {
    navigate("/documents");
  };

  const handleAuthClick = () => {
    if (isLoggingState) {
      logout();
    } else {
      navigate("/login");
    }
  };

  const handleCreateClick = () => {
    navigate("/new");
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1
          className="header__title"
          onClick={() => {
            navigate("/documents");
          }}
        >
          Google Doc
        </h1>
        <div className="header__buttons">
          {isLoggingState && (
            <button className="header__button" onClick={handleDocumentsClick}>
              My Documents
            </button>
          )}
          <button className="header__button" onClick={handleCreateClick}>
            Create
          </button>
          <button className="header__button" onClick={handleAuthClick}>
            {isLoggingState ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
