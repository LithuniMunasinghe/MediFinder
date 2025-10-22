import React, { useState, useEffect } from "react";
import "../css/adminPharmacy.css";

const AdminPharmacyManage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pharmacies")) || [];
    setPharmacies(stored);
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !password) return alert("Enter name and password");
    const newPharmacy = { id: Date.now(), name, password };
    const updated = [...pharmacies, newPharmacy];
    setPharmacies(updated);
    localStorage.setItem("pharmacies", JSON.stringify(updated));
    setName("");
    setPassword("");
  };

  const handleDelete = (id) => {
    const updated = pharmacies.filter((p) => p.id !== id);
    setPharmacies(updated);
    localStorage.setItem("pharmacies", JSON.stringify(updated));
  };

  return (
    <div className="admin-pharmacy-wrapper">
      <h2>Manage Pharmacies</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Pharmacy Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Add Pharmacy</button>
      </form>

      <div className="pharmacy-list">
        <h3>Registered Pharmacies</h3>
        {pharmacies.length === 0 ? (
          <p>No pharmacies added yet.</p>
        ) : (
          pharmacies.map((p) => (
            <div key={p.id} className="pharmacy-card">
              <p><strong>{p.name}</strong></p>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPharmacyManage;
