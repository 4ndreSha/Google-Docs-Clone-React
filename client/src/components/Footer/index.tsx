import React from "react";
import "./styles.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          © {currentYear} GOOGLE DOC. All rights reserved.
        </p>
        <p className="footer__text">
          Developed by{" "}
          <a
            href="https://github.com/4ndreSha"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Andrey Nesteruk
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
