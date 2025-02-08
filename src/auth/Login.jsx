import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';
import { URL } from "../Api & Services/Api.js";
import { CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { message } from 'antd';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated){
      const role = localStorage.getItem('role');
      if(role === 'ROLE_PATIENT')
        navigate('/patient/profile');
      else if(role === 'ROLE_DOCTOR')
        navigate("/doctor/profile");
      else if(role === 'ROLE_MANAGEMENT')
        navigate("/hospital/profile");
      else if(role === 'ROLE_PHARMACIST')
        navigate("/pharmacy/profile");
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      message.error('Please fill in all fields!');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${URL}/login`, { username, password });
      localStorage.setItem('token', response.data?.token);
      localStorage.setItem('isAuthenticated', "true");
      localStorage.setItem('role', response.data?.role);
    } catch (error) {
        console.error("Login error:", error);
        if (error.response?.data?.message) {
          message.error(error.response.data.message || "Login failed.");
        } else {
          message.error('An error occurred. Please try again.');
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">
          <span>Login</span>
        </h2>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress size={40} color="primary" />
          </Box>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-btn">Login</button>
          </form>
        )}

        <div className="auth-footer">
          <p>Don&apos;t have an account? <Link to="/Register">Register</Link></p>
          <p><Link to="/forgot-password">Forgot Password or Password?</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
