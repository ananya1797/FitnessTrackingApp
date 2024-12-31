import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import '../styles/Login.css'; 
import axiosInstance from '../axiosInstance'; // Import the axios instance

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Hook to programmatically navigate to Dashboard

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend to login the user
      const response = await axiosInstance.post('/users/login', formData);

      if (response.status === 200) {
        // If login is successful, save JWT token to localStorage
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Redirect to the dashboard
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login to Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link">
            Sign Up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
