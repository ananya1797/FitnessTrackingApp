import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import { UserContext } from './context/nutrition/UserContext';
import DietPlans from './DietPlans';
import Footer from "./Footer";
const Diets = () => {
  const [query, setQuery] = useState('');
  const [nutrition, setNutrition] = useState(null);
  const [error, setError] = useState('');
  const [meals, setMeals] = useState({ breakfast: '', lunch: '', dinner: '', snack: '' });
  const [totalCalories, setTotalCalories] = useState(0);
  const [saveMsg, setSaveMsg] = useState('');
  const [calorieFeedback, setCalorieFeedback] = useState('');

  const { userData } = useContext(UserContext);
  const goalType = userData?.goalType;
  const targetCalories = userData?.targetCalories;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTotalCalories(0);
      setCalorieFeedback('');
      setSaveMsg('');
    }, 20000);

    return () => clearTimeout(timer);
  }, [totalCalories, calorieFeedback, saveMsg]);

  const handleMealChange = (e) => {
    const { name, value } = e.target;
    setMeals({ ...meals, [name]: value });
  };

  const generateCalorieFeedback = (total, target, goal) => {
    const diff = total - target;

    if (!goal || !target) return '⚠️ Goal and target calories missing. Please update your profile.';

    switch (goal) {
      case 'lose':
        if (diff > 200) return "❌ You're above your deficit. Try lighter meals or add physical activity.";
        if (diff > 0) return "⚠️ Slightly above your goal. Reduce snacks or sugar intake.";
        if (diff < -300) return "⚠️ Too low intake. Consider including nuts or protein shakes.";
        return "✅ Perfect! You're within your calorie deficit.";
      case 'maintain':
        if (Math.abs(diff) <= 200) return "✅ Great! You're maintaining well.";
        if (diff > 200) return "❌ Too much intake. Consider reducing dinner portions.";
        return "⚠️ Low intake. Add more carbs or fats to balance.";
      case 'gain':
        if (diff < 0) return "⚠️ You're below your surplus. Eat calorie-dense foods like peanut butter or whole grains.";
        if (diff > 300) return "✅ Well done! You're in surplus range for gaining.";
        return "⚠️ Slightly low. Try adding a small post-dinner snack.";
      default:
        return "⚠️ Goal type not recognized.";
    }
  };

  const calculateTotalCalories = () => {
    const total = Object.values(meals).reduce((acc, curr) => acc + Number(curr || 0), 0);
    setTotalCalories(total);
    const feedback = generateCalorieFeedback(total, targetCalories, goalType);
    setCalorieFeedback(feedback);
  };

  const handleSaveMeals = async () => {
    try {
      const total = Object.values(meals).reduce((acc, curr) => acc + Number(curr || 0), 0);
      setTotalCalories(total);
      const feedback = generateCalorieFeedback(total, targetCalories, goalType);
      setCalorieFeedback(feedback);

      const token = localStorage.getItem("token");
      await axios.post(
        'http://localhost:5000/api/nutrition/logmeals',
        {
          ...meals,
          totalCalories: total,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          }
        }
      );

      setSaveMsg("✅ Meal data saved successfully!");
      setMeals({ breakfast: '', lunch: '', dinner: '', snack: '' });
    } catch (err) {
      console.error(err);
      setSaveMsg("❌ Failed to save meal data.");
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/nutrition/${encodeURIComponent(query)}`);
      const data = res.data;

      if (!data.calories || !data.fat || !data.protein) {
        setError('No food found. Try something more common.');
        setNutrition(null);
        return;
      }

      setNutrition(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Could not fetch nutrition data.');
      setNutrition(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 fw-bold text-center">Nutrition & Meal Logger</h2>

        {/* Search Bar */}
        <div className="card shadow-sm p-4 mb-4">
          <h5 className="mb-3">Check Food Nutrition</h5>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter food item (e.g., banana)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-primary" onClick={handleSearch}>Search</button>
          </div>
          {error && (
            <div className="mt-3 alert alert-light border-start border-danger ps-3 text-danger">
              {error}
            </div>
          )}
        </div>

        {/* Nutrition Info */}
        {nutrition && (
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="mb-3">Nutrition Info for: <strong>{query}</strong></h5>
            <div className="row">
              {['calories', 'fat', 'protein'].map((key) => (
                <div key={key} className="col-md-4">
                  <div className="border rounded p-3 mb-3 h-100 bg-light">
                    <h6 className="text-muted text-uppercase">{key}</h6>
                    <p className="mb-1"><strong>Value:</strong> {nutrition[key].value} {nutrition[key].unit}</p>
                    <p className="mb-1"><strong>95% Range:</strong> {nutrition[key].confidenceRange95Percent.min} - {nutrition[key].confidenceRange95Percent.max}</p>
                    <p className="mb-0"><strong>SD:</strong> {nutrition[key].standardDeviation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meal Logger */}
        <div className="card shadow-sm p-4 mb-5">
          <h5 className="mb-3">Log Your Meals</h5>
          <div className="row">
            {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
              <div key={meal} className="col-md-6 mb-3">
                <label className="form-label text-capitalize">{meal} Calories</label>
                <input
                  type="number"
                  className="form-control"
                  name={meal}
                  value={meals[meal]}
                  onChange={handleMealChange}
                  placeholder={`Enter ${meal} calories`}
                />
              </div>
            ))}
          </div>

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-secondary" onClick={calculateTotalCalories}>
              Calculate Total
            </button>
            <button className="btn btn-dark" onClick={handleSaveMeals}>
              Save Meals
            </button>
          </div>

          {/* Diet Plans Section */}
          <div className="card shadow-sm mt-4 p-4 mb-5 ">
  
  <DietPlans />
</div>


          {/* Floating Notifications */}
          <div
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 9999 }}
          >
            {totalCalories > 0 && (
              <div className="toast show bg-light border-start border-info mb-2" role="alert">
                <div className="toast-body text-dark fw-semibold">
                  Total Calories Today: {totalCalories}
                </div>
              </div>
            )}
            {targetCalories > 0 && (
              <div className="toast show bg-light border-start border-primary mb-2" role="alert">
                <div className="toast-body text-dark">
                  Target: {targetCalories} kcal for goal: <strong>{goalType}</strong>
                </div>
              </div>
            )}
            {calorieFeedback && (
              <div className="toast show bg-light border-start border-warning mb-2" role="alert">
                <div className="toast-body text-dark">
                  {calorieFeedback}
                </div>
              </div>
            )}
            {saveMsg && (
              <div className={`toast show mb-2 ${saveMsg.includes('success') ? 'border-success' : 'border-danger'} bg-light border-start`} role="alert">
                <div className="toast-body text-dark">
                  {saveMsg}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Diets;
