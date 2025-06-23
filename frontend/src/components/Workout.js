import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function Workout() {
    const [streak, setStreak] = useState(0);
    const [streakCount, setStreakCount] = useState(0);
const [showToast, setShowToast] = useState(false);

  const [form, setForm] = useState({ targetArea: '', calories: '', time: '' });
  const [message, setMessage] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [workoutDates, setWorkoutDates] = useState([]);
  const [stats, setStats] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
//    Sample Data
const workoutSuggestions = {
  abs: [
    { name: "Plank", duration: "60 sec", image: "🧘‍♀️" },
    { name: "Bicycle Crunches", duration: "3 sets of 20", image: "🚴" },
    { name: "Mountain Climbers", duration: "3 sets of 30 sec", image: "⛰️" },
    { name: "Leg Raises", duration: "3 sets of 15", image: "🦵" },
    { name: "Russian Twists", duration: "3 sets of 40 twists", image: "🌀" },
    { name: "Sit-Ups", duration: "3 sets of 25", image: "📈" }
  ],
  shoulders: [
    { name: "Shoulder Press", duration: "3 sets of 12", image: "🏋️" },
    { name: "Lateral Raises", duration: "3 sets of 15", image: "🤸" },
    { name: "Front Raises", duration: "3 sets of 15", image: "⬆️" },
    { name: "Reverse Fly", duration: "3 sets of 12", image: "🕊️" },
    { name: "Shrugs", duration: "3 sets of 20", image: "🤷" },
    { name: "Arm Circles", duration: "60 sec", image: "🔄" }
  ],
  legs: [
    { name: "Squats", duration: "3 sets of 20", image: "🦵" },
    { name: "Lunges", duration: "3 sets each leg", image: "🚶" },
    { name: "Wall Sit", duration: "1 min", image: "🧱" },
    { name: "Step Ups", duration: "3 sets of 15", image: "🪜" },
    { name: "Glute Bridges", duration: "3 sets of 20", image: "🌉" },
    { name: "Jump Squats", duration: "3 sets of 10", image: "🦘" }
  ],
  back: [
    { name: "Superman", duration: "3 sets of 15", image: "🦸" },
    { name: "Bent-over Rows", duration: "3 sets of 12", image: "🏋️" },
    { name: "Reverse Flys", duration: "3 sets of 10", image: "🕊️" },
    { name: "Deadlifts", duration: "3 sets of 10", image: "⚰️" },
    { name: "Pull-ups", duration: "3 sets of 8", image: "🧗" },
    { name: "Back Extensions", duration: "3 sets of 15", image: "🔁" }
  ],
  chest: [
    { name: "Push-Ups", duration: "3 sets of 20", image: "🙌" },
    { name: "Chest Press", duration: "3 sets of 12", image: "🏋️" },
    { name: "Incline Dumbbell Fly", duration: "3 sets of 10", image: "💪" },
    { name: "Incline Push-Up", duration: "3 sets of 15", image: "📈" },
    { name: "Chest Dips", duration: "3 sets of 10", image: "🤽" },
    { name: "Pec Deck Machine", duration: "3 sets of 12", image: "📟" }
  ],
  arms: [
    { name: "Bicep Curls", duration: "3 sets of 12", image: "💪" },
    { name: "Tricep Dips", duration: "3 sets of 15", image: "🏋️" },
    { name: "Hammer Curls", duration: "3 sets of 12", image: "🔨" },
    { name: "Overhead Tricep Extension", duration: "3 sets of 10", image: "🔝" },
    { name: "Concentration Curls", duration: "3 sets of 12", image: "🎯" },
    { name: "Zottman Curls", duration: "3 sets of 10", image: "🔁" }
  ],
  thighs: [
    { name: "Sumo Squats", duration: "3 sets of 15", image: "🦵" },
    { name: "Leg Press", duration: "3 sets of 12", image: "🏋️" },
    { name: "Jump Squats", duration: "3 sets of 10", image: "🦘" },
    { name: "Bulgarian Split Squats", duration: "3 sets each leg", image: "🇧🇬" },
    { name: "Frog Jumps", duration: "3 sets of 15", image: "🐸" },
    { name: "Donkey Kicks", duration: "3 sets of 15", image: "🐴" }
  ]
};


// 📌 Function to calculate workout streak
function calculateStreak(dates) {
  const sortedDates = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a));
  let streak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const current = new Date(sortedDates[i]);
    const previous = new Date(sortedDates[i - 1]);
    const diff = (previous - current) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else if (diff > 1) {
      break;
    }
  }

  return streak >= 2 ? streak : 0;
}

  const fetchWorkouts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/workouts/myworkouts', {
        headers: { 'auth-token': token }
      });

      const data = res.data;
      setWorkouts(data);

      // Calendar Dates
      const dates = data.map(w => w.date.split('T')[0]);
      setWorkoutDates(dates);
      // Streak Calculation
const sorted = [...dates].sort();
let currentStreak = 0;
for (let i = sorted.length - 1; i >= 0; i--) {
  const d1 = new Date(sorted[i]);
  const d2 = new Date();
  d2.setDate(d2.getDate() - currentStreak);

  if (d1.toDateString() === d2.toDateString()) {
    currentStreak++;
  } else {
    break;
  }
}
setStreakCount(currentStreak);

// Show toast only if streak is more than 1
setShowToast(currentStreak > 1);

      const streakCount = calculateStreak(dates);
        setStreak(streakCount);

      // Frequency by target area
      const frequencyMap = {};
      data.forEach(w => {
        frequencyMap[w.targetArea] = (frequencyMap[w.targetArea] || 0) + 1;
      });

      const chartData = Object.entries(frequencyMap).map(([targetArea, count]) => ({ targetArea, count }));
      setStats(chartData);
    } catch (err) {
      console.error('Failed to fetch workouts', err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/workouts/logworkout', form, {
        headers: { 'Content-Type': 'application/json', 'auth-token': token }
      });

      setMessage('✅ Workout logged successfully!');
      setForm({ targetArea: '', calories: '', time: '' });
      fetchWorkouts();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to log workout.');
    }
  };

  const tileClassName = ({ date }) => {
    const formatted = date.toISOString().split('T')[0];
    return workoutDates.includes(formatted) ? 'workout-day' : null;
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
  <div className="row g-4 align-items-stretch">
    {/* 💪 Workout Logging Section */}
    <div className="col-md-6">
      <div className="card shadow-lg border-0 rounded-4 p-4 h-100">
        <h3 className="text-center mb-4 text-success fw-bold">
          Log Your Workout
        </h3>

        {message && (
          <div className="alert alert-info text-center fw-semibold">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Target Area</label>
            <select
              className="form-select"
              name="targetArea"
              value={form.targetArea}
              onChange={handleChange}
              required
            >
              <option value="">Select an area</option>
              <option value="legs">Legs</option>
              <option value="shoulders">Shoulders</option>
              <option value="thighs">Thighs</option>
              <option value="abs">Abs</option>
              <option value="arms">Arms</option>
              <option value="back">Back</option>
              <option value="chest">Chest</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Calories Burnt (kcal)</label>
            <input
              type="number"
              className="form-control"
              name="calories"
              value={form.calories}
              onChange={handleChange}
              placeholder="e.g. 150"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Workout Time (minutes)</label>
            <input
              type="number"
              className="form-control"
              name="time"
              value={form.time}
              onChange={handleChange}
              placeholder="e.g. 45"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold">
            Log Workout
          </button>
        </form>
      </div>
    </div>

    {/* 📅 Calendar Section */}
    <div className="col-md-6">
      <div className="custom-calendar-wrapper shadow-sm border-0 p-4 h-100">
        <h5 className="text-center text-light mb-3">
          <i className="fas fa-calendar-check me-2"></i>Workout Calendar
        </h5>
        <div className="d-flex justify-content-center">
          <Calendar tileClassName={tileClassName} />
        </div>
      </div>
    </div>
  </div>
</div>



      {/* 📊 Workout Charts */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow border-0 rounded-4 p-4 h-100">
              <h5 className="text-center text-primary mb-3">
                <i className="fas fa-chart-bar me-2"></i>Frequency by Area
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats}>
                  <XAxis dataKey="targetArea" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0d6efd" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow border-0 rounded-4 p-4 h-100">
              <h5 className="text-center text-danger mb-3">
                <i className="fas fa-chart-line me-2"></i>Calories per Area (Avg)
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={computeAvgCaloriesByArea(workouts)}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="targetArea" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgCalories" stroke="#dc3545" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Suggested Workouts Section */}
<div className="container my-5">
  <h4 className="text-center text-primary mb-4">Suggested Workouts Based on Target Area</h4>
  <div className="row g-4">
    {(workoutSuggestions[form.targetArea] || []).map((workout, index) => (
      <div className="col-md-4" key={index}>
        <div className="card h-100 border-0 shadow rounded-4 p-3 text-center bg-light">
          <div className="display-4">{workout.image}</div>
          <h6 className="fw-bold mt-2">{workout.name}</h6>
          <p className="text-muted">{workout.duration}</p>
        </div>
      </div>
    ))}
    {!form.targetArea && (
      <div className="col-12 text-center text-muted">
        <em>Please select a target area to see workout suggestions.</em>
      </div>
    )}
  </div>
</div>

        </div>
      </div>
    {/* Floating notification for streak */}
    {streak > 0 && (
  <div
    style={{
      position: 'fixed',
      bottom: '90px',
      right: '30px',
      background: '#f8d7da',
      color: '#721c24',
      padding: '12px 20px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      fontWeight: '600'
    }}
  >
    🔥 You're on a {streak}-day streak! Keep it up!
  </div>
)}

        
      <Footer />
    </>
  );
}

export default Workout;

// 📌 Helper to compute average calories per target area
function computeAvgCaloriesByArea(workouts) {
  const areaMap = {};

  workouts.forEach(({ targetArea, calories }) => {
    if (!areaMap[targetArea]) {
      areaMap[targetArea] = { total: 0, count: 0 };
    }
    areaMap[targetArea].total += parseFloat(calories);
    areaMap[targetArea].count += 1;
  });

  return Object.entries(areaMap).map(([targetArea, { total, count }]) => ({
    targetArea,
    avgCalories: Math.round(total / count)
  }));
}
