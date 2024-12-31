import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/GetStarted.css';

function GetStarted() {
  return (
    <div className="background-container">
      <div className="content">
        <h1 className="welcome-text">Welcome to FitSphere!</h1>
        <Link to="/signup">
          <button className="get-started-btn">Let's Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default GetStarted;
