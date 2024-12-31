import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signup.css'; 
import axiosInstance from '../axiosInstance'; // Import the axios instance

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age:'',
    height:'',
    weight: ''
  });

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
      // Send POST request to backend to register the user
      const response = await axiosInstance.post('/users/register', formData);

      if (response.status === 201) {
        // If registration is successful, show success message and redirect to login
        alert('Registration successful!');
        window.location.href = '/login'; // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
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
          <div className="input-group">
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
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="height">Height (in cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="weight">Weight (in kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
        <p>
          Already a user?{' '}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
