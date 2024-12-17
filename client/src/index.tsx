import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Document from "./pages/Document";
import AuthGuard from "./services/AuthGuard";
import { AuthProvider } from "./utils/AuthContext";
import Home from "./pages/Home";
import "./styles.css";

const NewDocumentRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const newId = uuidV4();
    navigate(`/document/${newId}`);
  }, [navigate]);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to={`/login`} />} />
          <Route
            path="/documents"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route path="/new" element={<NewDocumentRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/document/:id" element={<Document />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
