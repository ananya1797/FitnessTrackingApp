import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Add styles for navbar

function Navbar() {
  return (
    <div className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/dashboard" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/workoutPlans" className="nav-link">Workout Plans</Link>
        </li>
        <li>
          <Link to="/workoutDiets" className="nav-link">Diets</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
