import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHeartbeat, FaBuilding, FaHandsHelping } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png"; // Import the same logo
import "../css/home.css"; // Reuse the same CSS for navbar
import "../css/about.css";

function AboutUs() {
  return (
    <div className="wrapper">
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
          <li>
           <NavLink to="/MedicineSearch" className={({ isActive }) => (isActive ? "active" : "")}>
              Medicine Search
           </NavLink>
          </li> 
           <li>
            <NavLink to="/loginRegister" className={({ isActive }) => (isActive ? "active" : "")}>
              Logout
            </NavLink>
          </li>
        </ul>
      </header>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-content-box">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h1 className="about-title">MediFinder</h1>
              <p className="about-subtext">
                Smart Search, Fast Relief.
              </p>
            </Col>
          </Row>

          <Row className="about-row">
            <Col md={6}>
              <div className="about-box">
                <FaHeartbeat className="about-icon" />
                <h3>Our Mission</h3>
                <p>
                  To provide high-quality healthcare with compassion and professionalism.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="about-box">
                <FaBuilding className="about-icon" />
                <h3>Our Vision</h3>
                <p>
                  To lead the region in healthcare, offering state-of-the-art care and technology.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="about-values">
            <Col md={4}>
              <div className="about-box small">
                <FaHandsHelping className="about-icon" />
                <h4>Compassion</h4>
                <p>We care for all with kindness and empathy.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="about-box small">
                <FaHeartbeat className="about-icon" />
                <h4>Excellence</h4>
                <p>We deliver the highest standards of care and service.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="about-box small">
                <FaBuilding className="about-icon" />
                <h4>Innovation</h4>
                <p>We continuously adopt the latest healthcare technologies.</p>
              </div>
            </Col>
          </Row>
        </Container>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;