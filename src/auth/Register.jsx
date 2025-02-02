import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../Api & Services/Api.js";
import axios from 'axios';
import "../Styles/Auth.css";
import { message } from "antd";
import { Box, CircularProgress } from "@mui/material";


function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "", 
    firstName: "",
    lastName: "",
    gender: "", 
    email: "",
    mobile: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    if(formData.password.length<8){
      message.error("Password must be minimum 8 characters!");
      return;
    }
    if(formData.mobile.length!==10){
      message.error("Invalid Mobile Number!");
      return;
    }
    
    const userData = {
      username: formData.username,
      password: formData.password,
      role: formData.role,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      email: formData.email,
      mobile: formData.mobile,
      dateOfBirth: formData.dateOfBirth,
    };

    setLoading(true);

    try {
      const response = await axios.post(`${URL}/register`, userData);
      message.success(response.data?.message);
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.error) {
        message.error(error.response.data.error);
      } else {
        message.error("An error occurred. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">
          <span>Register</span>
        </h2>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Role Selector */}
            <div className="input-field">
              <label htmlFor="role">Select Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled >Select Role</option>
                <option value="ROLE_PATIENT">Patient</option>
                <option value="ROLE_MANAGEMENT">Hospital Manager</option>
                <option value="ROLE_PHARMACIST">Pharmacist</option>
              </select>
            </div>

            {/* Username Field */}
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* First Name Field */}
            <div className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name Field */}
            <div className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender Field */}
            <div className="input-field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled >Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Email Field */}
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mobile Field */}
            <div className="input-field">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            {/* Conditional Fields for Patient */}
            {formData.role === "ROLE_PATIENT" && (
              <div className="input-field">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="auth-btn">Register</button>
          </form>)}

        <div className="auth-footer">
          <p>Already have an account? <Link to="/Login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
