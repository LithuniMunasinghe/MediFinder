import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/medicineSearch.css";
import logo from "../images/logo.png";

const MedicineSearch = () => {
  const [medicineName, setMedicineName] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!medicineName) return;

    // Fetch stored pharmacies with medicines
    const pharmacies = JSON.parse(localStorage.getItem("pharmacies")) || [];

    // Search all medicines across pharmacies
    const found = [];
    pharmacies.forEach((pharmacy) => {
      pharmacy.medicines?.forEach((med) => {
        if (med.name.toLowerCase().includes(medicineName.toLowerCase())) {
          found.push({
            medicine: med.name,
            pharmacy: pharmacy.name,
            location: pharmacy.location || "Not provided",
          });
        }
      });
    });

    setResults(found);
  };

  return (
    <div className="medicine-search-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/medicineSearch">Medicine Search</Link></li>
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

        {/* Search Results */}
        <div className="results">
          {results.length > 0 ? (
            results.map((res, index) => (
              <div key={index} className="result-card">
                <p><strong>Medicine:</strong> {res.medicine}</p>
                <p><strong>Pharmacy:</strong> {res.pharmacy}</p>
                <p><strong>Location:</strong> {res.location}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineSearch;
