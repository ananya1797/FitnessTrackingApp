import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Water() {
  const [glasses, setGlasses] = useState('');
  const [message, setMessage] = useState('');
  const [waterLogs, setWaterLogs] = useState([]);
  const [waterDates, setWaterDates] = useState([]);
  const [streakCount, setStreakCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setGlasses(e.target.value);
  };

  const fetchWaterLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/water/fetchlog', {
        headers: { 'auth-token': token }
      });

      const data = res.data;
      console.log("Fetched water logs:", data);
      setWaterLogs(data);

      const dates = data.map(entry => entry.date.split('T')[0]);
      setWaterDates(dates);

      // Streak logic
      const sorted = [...dates].sort().reverse(); // Sort descending
      let currentStreak = 0;
      for (let i = 0; i < sorted.length; i++) {
        const d1 = new Date(sorted[i]);
        const d2 = new Date();
        d2.setDate(d2.getDate() - currentStreak);
        if (d1.toDateString() === d2.toDateString()) {
          currentStreak++;
        } else {
          break;
        }
      }

      console.log("Streak:", currentStreak);
      setStreakCount(currentStreak);
      setShowToast(currentStreak >= 2);
    } catch (err) {
      console.error('Failed to fetch water logs', err);
    }
  };

  useEffect(() => {
    fetchWaterLogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/water/log',
        { glasses },
        { headers: { 'Content-Type': 'application/json', 'auth-token': token } }
      );
      setMessage('✅ Water intake logged successfully!');
      setGlasses('');
      fetchWaterLogs();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to log water intake.');
    }
  };

  const tileClassName = ({ date }) => {
    const formatted = date.toISOString().split('T')[0];
    return waterDates.includes(formatted) ? 'workout-day' : null;
  };

  const getChartData = () => {
    const map = {};
    waterLogs.forEach(({ date, glasses }) => {
      const day = date.split('T')[0];
      const glassCount = parseInt(glasses);
      if (!isNaN(glassCount)) {
        map[day] = (map[day] || 0) + glassCount;
      }
    });
    const chartData = Object.entries(map).map(([date, glasses]) => ({ date, glasses }));
    console.log("Chart Data:", chartData);
    return chartData;
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-4 p-4 h-100">
              <h3 className="text-center mb-4 text-primary fw-bold">Log Water Intake</h3>
              {message && <div className="alert alert-info text-center fw-semibold">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Number of Glasses</label>
                  <input
                    type="number"
                    className="form-control"
                    value={glasses}
                    onChange={handleChange}
                    required
                    min={1}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold">Log Water</button>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            <div className="custom-calendar-wrapper shadow-sm border-0 p-4 h-100">
              <h5 className="text-center text-light mb-3"><i className="fas fa-calendar-check me-2"></i>Water Calendar</h5>
              <div className="d-flex justify-content-center">
                <Calendar tileClassName={tileClassName} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="container my-5">
        <div className="card shadow border-0 rounded-4 p-4">
          <h5 className="text-center text-info mb-3"><i className="fas fa-tint me-2"></i>Water Intake Over Time</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getChartData()}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="glasses" fill="#0dcaf0" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Floating Streak Notification */}
      {showToast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
          <div className="toast align-items-center text-white bg-primary border-0 show" role="alert">
            <div className="d-flex">
              <div className="toast-body fw-semibold">
                💧 You're on a {streakCount}-day water streak! Hydration goals 💪
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Water;
