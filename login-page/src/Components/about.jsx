import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaHeartbeat, FaBuilding, FaHandsHelping } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png"; // Import the same logo
import "../css/home.css"; // Reuse the same CSS for navbar

function AboutUs() {
  return (
    <div className="wrapper">
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

      {/* About Us Content */}
      <Container className="mt-5 pt-5"> {/* pt-5 ensures content is not hidden under navbar */}
        {/* Header Section */}
        <Row className="text-center mb-4">
          <Col>
            <h1>ABC Hospital</h1>
            <p>Providing quality healthcare with care and compassion.</p>
          </Col>
        </Row>

        {/* Mission and Vision Section */}
        <Row className="mb-3">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>
                  <FaHeartbeat className="mr-2" /> Mission
                </Card.Title>
                <Card.Text>
                  To provide high-quality healthcare with compassion and professionalism.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>
                  <FaBuilding className="mr-2" /> Vision
                </Card.Title>
                <Card.Text>
                  To lead the region in healthcare, offering state-of-the-art care.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Core Values Section */}
        <Row className="mb-3">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <FaHandsHelping className="display-4 mb-2 text-primary" />
                <Card.Title>Compassion</Card.Title>
                <Card.Text>
                  We care for all with kindness and empathy.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <FaHeartbeat className="display-4 mb-2 text-success" />
                <Card.Title>Excellence</Card.Title>
                <Card.Text>
                  We deliver the highest standards of care and service.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <FaBuilding className="display-4 mb-2 text-info" />
                <Card.Title>Innovation</Card.Title>
                <Card.Text>
                  We continuously adopt the latest healthcare technologies.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action Section */}
        <Row className="text-center mb-5">
          <Col>
            <Button variant="primary" href="/home">
              Get in Touch
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUs;
