import React from 'react';
import Navbar from './Navbar';
// import '../styles/WorkoutPlans.css';

function WorkoutPlans() {
  return (
    <div className="workout-plans">
      <Navbar/>
      <h1>Workout Plans</h1>
      <p>Choose your personalized workout plan to stay fit and healthy!</p>
      {/* Add workout plan content */}
    </div>
  );
}

export default WorkoutPlans;
