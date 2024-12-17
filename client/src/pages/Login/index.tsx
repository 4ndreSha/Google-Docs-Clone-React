import React from "react";
import { Link } from "react-router-dom";
import LoginComponent from "../../components/LoginComponent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
//import "../styles.css";

function Login() {
  return (
    <>
      <Header />
      <LoginComponent />
      <Footer />
    </>
  );
}

export default Login;
