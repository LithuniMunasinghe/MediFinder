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
    setResults([
      { id: 1, name: medicineName, pharmacy: "Pharmacy A" },
      { id: 2, name: medicineName, pharmacy: "Pharmacy B" },
    ]);
  };

  return (
    <div className="medicine-search-wrapper">
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/medicineSearch">Medicine Search</Link></li>
        </ul>
      </nav>

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

        <div className="results">
          {results.map((res) => (
            <div key={res.id} className="result-card">
              <p><strong>Medicine:</strong> {res.name}</p>
              <p><strong>Available at:</strong> {res.pharmacy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineSearch;
