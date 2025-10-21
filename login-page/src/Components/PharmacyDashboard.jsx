import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/adminPharmacy.css"; // reuse same CSS for simplicity

const PharmacyDashboard = () => {
  const navigate = useNavigate();
  const pharmacyName = localStorage.getItem("loggedPharmacy");
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  useEffect(() => {
    if (!pharmacyName) {
      navigate("/pharmacyLogin");
    } else {
      const storedMedicines =
        JSON.parse(localStorage.getItem(`medicines_${pharmacyName}`)) || [];
      setMedicines(storedMedicines);
    }
  }, [pharmacyName, navigate]);

  // handle add medicine
  const handleAddMedicine = (e) => {
    e.preventDefault();

    if (!newMedicine.name || !newMedicine.quantity || !newMedicine.price) {
      alert("Please fill all fields.");
      return;
    }

    const updated = [...medicines, { id: Date.now(), ...newMedicine }];
    setMedicines(updated);
    localStorage.setItem(`medicines_${pharmacyName}`, JSON.stringify(updated));
    setNewMedicine({ name: "", quantity: "", price: "" });
  };

  // handle delete medicine
  const handleDelete = (id) => {
    const updated = medicines.filter((med) => med.id !== id);
    setMedicines(updated);
    localStorage.setItem(`medicines_${pharmacyName}`, JSON.stringify(updated));
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("loggedPharmacy");
    navigate("/pharmacyLogin");
  };

  return (
    <div className="admin-container">
      <h2>{pharmacyName} Dashboard</h2>

      <button
        onClick={handleLogout}
        style={{ float: "right", marginBottom: "15px", backgroundColor: "red", color: "white" }}
      >
        Logout
      </button>

      {/* Add Medicine Form */}
      <form className="admin-form" onSubmit={handleAddMedicine}>
        <h3>Add Medicine</h3>
        <input
          type="text"
          placeholder="Medicine Name"
          value={newMedicine.name}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newMedicine.quantity}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, quantity: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price (LKR)"
          value={newMedicine.price}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, price: e.target.value })
          }
        />
        <button type="submit">Add Medicine</button>
      </form>

      {/* Medicines List */}
      <div className="admin-table">
        <h3>Medicines You Added</h3>
        {medicines.length === 0 ? (
          <p>No medicines added yet.</p>
        ) : (
          <table border="1" width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price (LKR)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr key={med.id}>
                  <td>{med.name}</td>
                  <td>{med.quantity}</td>
                  <td>{med.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(med.id)}
                      style={{
                        backgroundColor: "darkred",
                        color: "white",
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PharmacyDashboard;
