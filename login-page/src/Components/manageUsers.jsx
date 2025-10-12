import React, { useState, useEffect } from "react";
import { Button, Table, Alert, Spinner, Form, Modal } from "react-bootstrap";
import { FaUserPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/manageUsers.css"; // ✅ Link CSS

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    number: "",
    email: "",
    userName: "",
    password: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/my-app/patients");
        setUsers(response.data);
      } catch (error) {
        setError("There was an error fetching the users data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add new user
  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/my-app/patients", formData);
      setUsers([...users, response.data]);
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Edit user
  const handleEditUser = async () => {
    try {
      await axios.put(`http://localhost:8080/my-app/patients/${currentUserId}`, formData);
      setUsers(users.map((user) => (user.id === currentUserId ? { ...user, ...formData } : user)));
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/my-app/patients/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      address: "",
      number: "",
      email: "",
      userName: "",
      password: "",
    });
    setIsEdit(false);
    setCurrentUserId(null);
  };

  return (
    <div className="manage-users-wrapper">
      {/* Header Buttons */}
      <div className="header-buttons">
        <Button variant="outline-primary" onClick={() => navigate("/Admin")}>
          <FaArrowLeft /> Back to Home
        </Button>
        <Button variant="outline-success" onClick={() => setShowAddForm(true)}>
          <FaUserPlus /> Add User
        </Button>
      </div>

      {/* Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loader or Table */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.address}</td>
                <td>{user.number}</td>
                <td>{user.email}</td>
                <td>{user.userName}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setFormData(user);
                      setIsEdit(true);
                      setCurrentUserId(user.id);
                      setShowAddForm(true);
                    }}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="ms-2"
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit User */}
      <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Age", name: "age", type: "number" },
              { label: "Address", name: "address", type: "text" },
              { label: "Contact No", name: "number", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Username", name: "userName", type: "text" },
              { label: "Password", name: "password", type: "password" },
            ].map((field, index) => (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
            <Button
              variant="primary"
              onClick={isEdit ? handleEditUser : handleAddUser}
              className="w-100"
            >
              {isEdit ? "Update User" : "Save User"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageUsers;
