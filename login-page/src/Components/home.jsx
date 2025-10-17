import React, { useState, useEffect } from "react";
import "../css/home.css";
import "../css/slider.css";  
import { Link } from "react-router-dom";
import logo from "../images/logo.png"; // <-- import the logo
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; 
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";
import slide4 from "../images/slide4.jpg";


const Home = () => {


  const slides = [slide2, slide3, slide4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // change every 3 seconds
    return () => clearInterval(interval);
  }, []);


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
         <li><Link to="/medicineSearch">Medicine Search</Link></li> 
        </ul>
      </header>

      {/* Image cards with fade */}
      <div className="card-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`card ${index === currentIndex ? "active" : ""}`}
          >
            <img src={slide} alt={`slide-${index}`} />
          </div>
        ))}
      </div>


      {/* Centered content */}
      <div className="center">
    
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
