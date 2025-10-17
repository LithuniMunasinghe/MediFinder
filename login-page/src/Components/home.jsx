import React from "react";
import "../css/home.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear session
    navigate("/loginRegister");        // redirect to login page
  };

  return (
    <div className="wrapper">
      {/* Navbar */}
      <header className="navbar">
        <img src={logo} alt="Medicure Logo" className="logo" />

        <div className="nav-right">
          <ul className="nav-links">
            <li>
              <NavLink to="/home" end className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About Us
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

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Centered content */}
      <div className="center">
        <h1>Welcome To MEDI-FINDER</h1>
        
        {/* Optional buttons */}
        {/*
        <div className="buttons">
          <button>Get Started</button>
          <button className="btn2">Learn More</button>
        </div>
        */}
      </div>
    </div>
  );
};

export default Home;