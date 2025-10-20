import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png"; // Your logo
import ChatBot from "../Components/chatBot"; // Adjust path if needed
import "../css/med.css"; // Make sure navbar CSS is included

export default function Med() {
  return (
    <div>
       {/* NAVBAR */}
      <header className="navbar">
         <div className="logo-container">
        <img src={logo} alt="Medicure Logo" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/home" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctorView" className={({ isActive }) => (isActive ? "active" : "")}>
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" className={({ isActive }) => (isActive ? "active" : "")}>
              Feedback
            </NavLink>
          </li>
          <li>
            <NavLink to="/location" className={({ isActive }) => (isActive ? "active" : "")}>
              Location
            </NavLink>
          </li>
          <li>
            <NavLink to="/med" className={({ isActive }) => (isActive ? "active" : "")}>
              Medicine
            </NavLink>
          </li>
        </ul>
      </header>

      {/* ChatBot */}
      <div style={{ marginTop: "120px" }}> {/* Push down below fixed navbar */}
        <ChatBot />
      </div>
    </div>
  );
}
