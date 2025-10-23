import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/pharmacyLogin.css";

const PharmacyLogin = () => {
  const [pharmacyName, setPharmacyName] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsActive((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!pharmacyName || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both Pharmacy Name and Password.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8084/api/pharmacies/login",
        {
          name: pharmacyName,
          password: password,
        }
      );

      if (response.status === 200 && response.data) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome, ${response.data.name}`,
          timer: 1500,
          showConfirmButton: false,
        });

        localStorage.setItem("pharmacyId", response.data.id);
        localStorage.setItem("pharmacyName", response.data.name);

        navigate("/pharmacyDashboard");
      }
    } catch (error) {
      console.error("Error during Pharmacy Login:", error);

      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Please check your pharmacy name and password.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please try again later.",
        });
      }
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      {/* Pharmacy Login Form */}
      <div className="form-container sign-in visible">
        <form onSubmit={handleLogin}>
          <h1>Pharmacy Login</h1>

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

          <div className="button-group">
            <button type="submit" className="login-btn">Login</button>
            <button type="button" className="back-btn" onClick={() => navigate("/loginRegister")}>←</button>
          </div>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Pharmacies!</h1>
            <p>Login to manage your medicines and account</p>
            <button onClick={toggleForm}>Login</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>MEDI-FINDER</h1>
            <h1>Hello!</h1>
            <p>Only registered pharmacies can login here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyLogin;
