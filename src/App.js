import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"; // Import Navigate
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./components/Home";  // Import Home component
import UploadedFilesPage from "./components/UploadedFilesPage";
import './App.css';

const App = () => {
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-left">
            {/* Home Dropdown */}
            <div className="navbar-dropdown">
              <button
                className="navbar-link dropdown-btn"
                onClick={() => setShowHomeDropdown(!showHomeDropdown)}
              >
                Home
              </button>
              {showHomeDropdown && (
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/home">Home Page</Link>
                  <Link className="dropdown-item" to="/uploaded-files">Uploaded Files</Link>
                </div>
              )}
            </div>
          </div>

          <div className="navbar-right">
            {/* Home Dropdown */}
            <div className="navbar-dropdown">
              <button
                className="navbar-link dropdown-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                User
              </button>
              {showUserDropdown && (
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="/Login">Log In</Link>
                  <Link className="dropdown-item" to="/register">Register</Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="content">
          <Routes>
            {/* Default route redirects to /register */}
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/uploaded-files" element={<UploadedFilesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
