import React, { useState } from "react";
import "../css/loginRegister.css"; // same CSS as your login/register
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

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
    <div className="container active" id="container">
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
          <button
            type="button"
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#2f7dc2ff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/loginRegister")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;