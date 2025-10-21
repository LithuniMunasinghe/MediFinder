import React, { useState } from "react";
import "../css/loginRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginRegister = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  // Form field states
  const [patientUsername, setUsername] = useState('');
  const [patientPassword, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const toggleForm = () => {
    setIsSignUp(prev => !prev);
    setIsActive(prev => !prev);
  };

  // Handle Sign In
  const handleSubmitSignIn = async (e) => {
    e.preventDefault();

    if (!patientUsername || !patientPassword) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both Username and Password.",
      });
      return;
    }

    if (patientUsername === "admin" && patientPassword === "1023") {
      Swal.fire({
        icon: "success",
        title: "Welcome Admin!",
        text: "Redirecting to admin panel...",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/admin");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/my-app/loginUser", {
        userName: patientUsername,
        password: patientPassword,
      });

      if (response.data.success === true) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: "Please check your username and password.",
        });
      }
    } catch (error) {
      console.error("Error during Sign In:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please try again later.",
      });
    }
  };

  // Handle Sign Up
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !age || !address || !contact || !email || !patientUsername || !patientPassword) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please fill out all fields before continuing.",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/my-app/patients", {
        name: fullName,
        age: age,
        email: email,
        number: contact,
        address: address,
        userName: patientUsername,
        password: patientPassword,
      });

      if (response.data.id) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You can now sign in to your account.",
          timer: 1500,
          showConfirmButton: false,
        });
        toggleForm(); // Switch to Sign In form automatically
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during Sign Up:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please check your details and try again.",
      });
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">

      {/* Sign Up Form */}
      <div className={`form-container sign-up ${isSignUp ? "visible" : "hidden"}`}>
        <form onSubmit={handleSubmitSignUp}>
          <h1>Create Account</h1>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input type="text" placeholder="Contact No" value={contact} onChange={(e) => setContact(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Username" value={patientUsername} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={patientPassword} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className={`form-container sign-in ${!isSignUp ? "visible" : "hidden"}`}>
        <form onSubmit={handleSubmitSignIn}>
          <h1>Sign In</h1>
          <input type="text" placeholder="Username" value={patientUsername} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={patientPassword} onChange={(e) => setPassword(e.target.value)} />
          <a href="#">Forgot Your Password?</a>
          <button type="submit">Sign In</button>
          {/* Pharmacy Login Button */}
<button
  type="button"
  style={{
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#4518a4",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
  onClick={() => navigate("/pharmacyLogin")}
>
  Pharmacy Login
</button>

        </form>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to create an account</p>
            <button onClick={toggleForm}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>MEDI-FINDER</h1>
            <h1>Hello!</h1>
            <p>Register with your personal details first</p>
            <button onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
