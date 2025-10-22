import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/adminPharmacy.css"; // reuse same CSS

const PharmacyDashboard = () => {
  const navigate = useNavigate();
  const pharmacyId = localStorage.getItem("pharmacyId");
  const pharmacyName = localStorage.getItem("pharmacyName");

  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  // Fetch medicines from backend
  useEffect(() => {
    if (!pharmacyId) {
      navigate("/pharmacyLogin");
    } else {
      fetchMedicines();
    }
  }, [pharmacyId, navigate]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8084/api/pharmacies/${pharmacyId}/medicines`
      );
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  // Add medicine
  const handleAddMedicine = async (e) => {
    e.preventDefault();
    if (!newMedicine.name || !newMedicine.quantity || !newMedicine.price) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const payload = {
        medicineId: 0, // You might need to fetch medicine ID from medicine table or create new
        quantity: parseInt(newMedicine.quantity),
        price: parseFloat(newMedicine.price),
      };

      // For simplicity, we assume the medicine is already created in DB.
      // Otherwise, you need a create-medicine API first.

      await axios.post(
        `http://localhost:8084/api/pharmacies/${pharmacyId}/add-medicine`,
        payload
      );

      setNewMedicine({ name: "", quantity: "", price: "" });
      fetchMedicines(); // refresh the list
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  // Delete medicine
  const handleDelete = async (inventoryId) => {
    try {
      await axios.delete(
        `http://localhost:8084/api/pharmacies/${pharmacyId}/update-medicine/${inventoryId}`
      );
      fetchMedicines();
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("pharmacyId");
    localStorage.removeItem("pharmacyName");
    navigate("/pharmacyLogin");
  };

  return (
    <div className="admin-container">
      <h2>{pharmacyName} Dashboard</h2>
      <button
        onClick={handleLogout}
        style={{
          float: "right",
          marginBottom: "15px",
          backgroundColor: "red",
          color: "white",
        }}
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
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Price (LKR)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr key={med.id}>
                  <td>{med.medicineName}</td>
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