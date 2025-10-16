import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png"; // Your logo
import ChatBot from "../Components/chatBot"; // Adjust path if needed
import "../css/med.css"; // Make sure navbar CSS is included

export default function Med() {
  return (
    <div>
      {/* NAVBAR */}
      <header className="navbar">
        <img src={logo} alt="Medicure Logo" className="logo" />
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/doctorView">Doctors</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/location">Location</Link></li>
          <li><Link className="active" to="/med">Medicine</Link></li>
        </ul>
      </header>

      {/* ChatBot */}
      <div style={{ marginTop: "120px" }}> {/* Push down below fixed navbar */}
        <ChatBot />
      </div>
    </div>
  );
}
