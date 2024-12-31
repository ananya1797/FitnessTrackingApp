import React from 'react';
import '../styles/Dashboard.css'; // Add styles for dashboard page
import Navbar from './Navbar';

function Dashboard() {
  const user = {
    name: "John Doe",
    age: 25,
    weight: 70,
    height: 175,
  };

  return (
    <div>
        <Navbar/>
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}</h1>
        <p>Your Dashboard</p>
      </div>

      <div className="dashboard-content">
        {/* User Information Card */}
        <div className="user-info">
          <h2>User Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age} years</p>
          <p><strong>Height:</strong> {user.height} cm</p>
          <p><strong>Weight:</strong> {user.weight} kg</p>
        </div>

        {/* Flexbox for stats */}
        <div className="stats">
          <div className="stat-card">
            <h3>Calorie Intake Today</h3>
            <div className="stat-ring">
              <div className="ring-text">1500 kcal</div>
            </div>
          </div>
          <div className="stat-card">
            <h3>Hours Slept</h3>
            <div className="stat-ring">
              <div className="ring-text">8 hrs</div>
            </div>
          </div>
          <div className="stat-card">
            <h3>Workout Goal</h3>
            <div className="stat-ring">
              <div className="ring-text">45 mins</div>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h3>Target Weight</h3>
            <div className="stat-ring">
              <div className="ring-text">65 kg</div>
            </div>
          </div>
          <div className="stat-card">
            <h3>Steps Taken</h3>
            <div className="stat-ring">
              <div className="ring-text">8000 steps</div>
            </div>
          </div>
          <div className="stat-card">
            <h3>Water Intake</h3>
            <div className="stat-ring">
              <div className="ring-text">2.5 L</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Dashboard;
