import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { PHARMACY_API } from "../config";

const AdminPharmacyManage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [newPharmacy, setNewPharmacy] = useState({
    name: "",
    location: "",
    contact: "",
  });

  // Load pharmacies
  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const response = await axios.get(`${PHARMACY_API}/pharmacies`);
      setPharmacies(response.data);
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
      Swal.fire("Error", "Cannot connect to pharmacy backend", "error");
    }
  };

  // Add pharmacy
  const handleAddPharmacy = async () => {
    if (!newPharmacy.name || !newPharmacy.location || !newPharmacy.contact) {
      Swal.fire("Error", "Please fill in all fields", "warning");
      return;
    }
    try {
      await axios.post(`${PHARMACY_API}/pharmacies`, newPharmacy);
      Swal.fire("Success", "Pharmacy added successfully!", "success");
      setNewPharmacy({ name: "", location: "", contact: "" });
      fetchPharmacies();
    } catch (error) {
      Swal.fire("Error", "Failed to add pharmacy", "error");
    }
  };

  // Delete pharmacy
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${PHARMACY_API}/pharmacies/${id}`);
      Swal.fire("Deleted!", "Pharmacy deleted successfully", "success");
      fetchPharmacies();
    } catch (error) {
      Swal.fire("Error", "Failed to delete pharmacy", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Pharmacies</h2>

      <div className="card p-3 shadow mb-4">
        <h5>Add New Pharmacy</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Pharmacy Name"
          value={newPharmacy.name}
          onChange={(e) =>
            setNewPharmacy({ ...newPharmacy, name: e.target.value })
          }
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Location"
          value={newPharmacy.location}
          onChange={(e) =>
            setNewPharmacy({ ...newPharmacy, location: e.target.value })
          }
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Contact Number"
          value={newPharmacy.contact}
          onChange={(e) =>
            setNewPharmacy({ ...newPharmacy, contact: e.target.value })
          }
        />
        <button className="btn btn-primary" onClick={handleAddPharmacy}>
          Add Pharmacy
        </button>
      </div>

      <table className="table table-bordered table-striped shadow">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No pharmacies found.
              </td>
            </tr>
          ) : (
            pharmacies.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.location}</td>
                <td>{p.contact}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPharmacyManage;
