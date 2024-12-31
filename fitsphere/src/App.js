import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetStarted from './Components/GetStarted';
import Signup from './Components/Signup'; // Import Signup component
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import WorkoutDiets from './Components/WorkoutDiets';
import WorkoutPlans from './Components/WorkoutPlans';
import Contact from './Components/Contact';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/workoutDiets" element={<WorkoutDiets/>}/>
        <Route path="/workoutPlans" element={<WorkoutPlans/>}/>
        <Route path="/contact" element={<Contact/>}/>

      </Routes>
    </Router>
  );
}

export default App;
