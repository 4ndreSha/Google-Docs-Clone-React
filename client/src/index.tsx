import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import Home from "./pages/Home";
import "./styles.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import TextEditor from "./components/TextEditor";
import { v4 as uuidV4 } from "uuid";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
