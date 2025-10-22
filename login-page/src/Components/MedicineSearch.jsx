import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/medicineSearch.css";
import logo from "../images/logo.png";
import "../css/home.css";

const MedicineSearch = () => {
  const [medicineName, setMedicineName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!medicineName.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      // Call backend search API
      const response = await fetch(
        `http://localhost:8084/api/pharmacies/search?medicines=${encodeURIComponent(
          medicineName
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }

      const data = await response.json();

      if (data.length === 0) {
        setError("No results found");
      } else {
        setResults(data);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="medicine-search-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li><Link className="active" to="/home">Home</Link></li>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/doctorView">Doctors</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/location">Location</Link></li>
          <li><Link to="/med">Medicine</Link></li> 
          <li><Link to="/MediFinder">MediFinder</Link></li>
          <li><Link to="/loginRegister"> Logout</Link></li>                   
        </ul>
      </nav>

      {/* Search Section */}
      <div className="search-container">
        <h2>Search Medicines</h2>
        <form className="medicine-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter medicine name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Loading and Error */}
        {loading && <p>Loading...</p>}
        {error && <p className="no-results">{error}</p>}

        {/* Search Results */}
        <div className="results">
          {results.map((res, index) => (
            <div key={index} className="result-card">
              <p><strong>Medicine:</strong> {res.medicineName}</p>
              <p><strong>Pharmacy:</strong> {res.pharmacyName}</p>
              <p><strong>Quantity:</strong> {res.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineSearch;
