import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../css/pharmacyLogin.css"; // same style as PharmacyLogin

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const toggleForm = () => {
    setIsActive((prev) => !prev);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!username || !email || !newPassword) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please fill out all fields.",
      });
      return;
    }

    try {
      const response = await axios.put("http://localhost:8080/my-app/resetPassword", {
        username,
        email,
        newPassword,
      });

      if (response.data.message === "Password reset successful") {
        Swal.fire({
          icon: "success",
          title: "Password Reset Successful!",
          text: "You can now login with your new password.",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/loginRegister");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text:
          error.response?.data?.message ||
          "Unable to reset password. Please check your username and email.",
      });
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      {/* Forgot Password Form */}
      <div className="form-container sign-in visible">
        <form onSubmit={handleResetPassword}>
          <h1>Forgot Password</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <div className="button-group">
            <button type="submit" className="login-btn">Reset Password</button>
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/loginRegister")}
            >
              ←
            </button>
          </div>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Reset Your Password</h1>
            <p>Enter your account details to create a new password.</p>
            <button onClick={toggleForm}>Reset</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>MEDI-FINDER</h1>
            <p>Secure password recovery for registered users.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
