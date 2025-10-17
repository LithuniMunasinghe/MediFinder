import React from "react";
import { NavLink } from "react-router-dom";
import "../css/location.css";
import logo from "../images/logo.png";

const LocationPage = () => {
  return (
    <div className="location-wrapper">
     {/* NAVBAR */}
      <header className="navbar">
        <img src={logo} alt="Medicure Logo" className="logo" />
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
      {/* Location Section */}
      <div className="location-container">
        <h1>Our Location</h1>
        <hr />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15844.278250026602!2d79.87369231744849!3d6.88227044302736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1spharmacy!5e0!3m2!1sen!2slk!4v1758685976239!5m2!1sen!2slk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>
    </div>
  );
};

export default LocationPage;
