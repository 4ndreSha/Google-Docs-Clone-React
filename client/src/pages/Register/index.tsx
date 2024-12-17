import React from "react";
import { Link } from "react-router-dom";
import RegisterComponent from "../../components/RegisterComponent";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
//import "../styles.css";

function Register() {
  return (
    <>
      <Header />
      <RegisterComponent />
      <Footer />
    </>
  );
}

export default Register;
