import React from "react";
import { Link } from "react-router-dom";
import TextEditor from "../../components/TextEditor/index";
import Header from "../../components/Header/index";
//import "../styles.css";

function Document() {
  return (
    <>
      <Header />
      <TextEditor />
    </>
  );
}

export default Document;
