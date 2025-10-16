import React from "react";
import "../css/home.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.png"; // <-- import the logo
import bb from "../images/bb.jpg"
const Home = () => {
  return (
    <div className="wrapper">
      {/* Navbar */}
      <header className="navbar">
<img src={logo} alt="Medicure Logo" className="logo" />

        <ul className="nav-links">
          <li><Link className="active" to="/">Home</Link></li>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/doctorView">Doctors</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/location">Location</Link></li>
          <li><Link to="/med">Medicine</Link></li> 
        </ul>
      </header>

      {/* Centered content */}
      <div className="center">
        <h1>Welcome To MEDI-FINDER</h1>
        {/* Optional buttons */}
        {/* <div className="buttons">
          <button>Get Started</button>
          <button className="btn2">Learn More</button>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
