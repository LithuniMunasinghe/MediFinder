import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/pharmacyLogin.css";

const PharmacyLogin = () => {
  const [pharmacyName, setPharmacyName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const pharmacies = JSON.parse(localStorage.getItem("pharmacies")) || [];
    const found = pharmacies.find(
      (p) => p.name === pharmacyName && p.password === password
    );

    if (found) {
      localStorage.setItem("pharmacyName", pharmacyName);
      navigate("/pharmacyDashboard");
    } else {
      alert("Invalid pharmacy name or password");
    }
  };

  return (
    <div className="pharmacy-login-wrapper">
      <h2>Pharmacy Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Pharmacy Name"
          value={pharmacyName}
          onChange={(e) => setPharmacyName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default PharmacyLogin;
