import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { UserContext } from "./context/nutrition/UserContext";
import Footer from "./Footer";
function Home() {
  const { userData, setUserData, error, loading } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "", email: "", gender: "", age: "", height: "", weight: "",
    goalType: "", goalWeight: ""
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        gender: userData.gender || "",
        age: userData.age || "",
        height: userData.height || "",
        weight: userData.weight || "",
        goalType: userData.goalType || "",
        goalWeight: userData.goalWeight || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: userData.name || "",
      email: userData.email || "",
      gender: userData.gender || "",
      age: userData.age || "",
      height: userData.height || "",
      weight: userData.weight || "",
      goalType: userData.goalType || "",
      goalWeight: userData.goalWeight || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/fitness/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) return;

      const height = parseFloat(data.height);
      const weight = parseFloat(data.weight);
      const age = parseInt(data.age);
      const gender = data.gender?.toLowerCase();

      const bmi = weight / ((height / 100) ** 2);
      const bmr = gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

      let targetCalories = bmr;
      if (data.goalType === "lose") targetCalories -= 500;
      if (data.goalType === "gain") targetCalories += 500;

      setUserData({
        ...data,
        bmi: bmi.toFixed(1),
        targetCalories: Math.round(targetCalories),
      });

      setIsEditing(false);
    } catch (err) {
      console.log("Update error: " + err.message);
    }
  };

  if (loading) return <div>Loading your dashboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!userData) return null;

  return (
    <>
      <Navbar />
      <div className="container mt-4 mb-5 px-4">
        <h2 className="mb-4 text-center">👋 Welcome back, {userData.name}!</h2>

        <div className="card shadow-sm border-0 px-4 py-4" style={{ borderRadius: "0px" }}>
          {isEditing ? (
            <>
              <h5 className="mb-3">Edit Your Profile</h5>
              <form onSubmit={handleSubmit}>
                {["name", "email", "gender", "age", "height", "weight", "goalWeight"].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label text-capitalize">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={field === "age" || field.includes("weight") || field === "height" ? "number" : "text"}
                      className="form-control"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
                <div className="mb-3">
                  <label className="form-label">Goal Type</label>
                  <select
                    className="form-select"
                    name="goalType"
                    value={formData.goalType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="lose">Lose Weight</option>
                    <option value="gain">Gain Weight</option>
                    <option value="maintain">Maintain Weight</option>
                  </select>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success">
                    <i className="fas fa-save me-2" />
                    Save
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item bg-transparent border-0">
                  <i className="fas fa-envelope me-2" /> <strong>Email:</strong> {userData.email}
                </li>
                <li className="list-group-item bg-transparent border-0">
                  <i className="fas fa-venus-mars me-2" /> <strong>Gender:</strong> {userData.gender}
                </li>
                <li className="list-group-item bg-transparent border-0">
                  <i className="fas fa-user me-2" /> <strong>Age:</strong> {userData.age}
                </li>
                <li className="list-group-item bg-transparent border-0">
                  <i className="fas fa-ruler-vertical me-2" /> <strong>Height:</strong> {userData.height} cm
                </li>
                <li className="list-group-item bg-transparent border-0">
                  <i className="fas fa-weight me-2" /> <strong>Weight:</strong> {userData.weight} kg
                </li>
                <li className="list-group-item bg-transparent border-0">
                  <i className="fas fa-bullseye me-2" /> <strong>Goal:</strong> {userData.goalType} to {userData.goalWeight} kg
                </li>
                <li className="list-group-item bg-transparent border-0">
                  <i className="fas fa-heartbeat me-2" /> <strong>BMI:</strong>{" "}
                  <span className="badge bg-primary">{userData.bmi}</span>
                </li>
                <li className="list-group-item bg-transparent border-0">
                  <i className="fas fa-fire me-2" /> <strong>Target Calories:</strong>{" "}
                  <span className="badge bg-success">{userData.targetCalories} kcal/day</span>
                </li>
                <li className="list-group-item bg-transparent border-0">
                  <i className="fas fa-calendar-alt me-2" /> <strong>Joined:</strong>{" "}
                  {new Date(userData.date).toLocaleDateString()}
                </li>
              </ul>
              <div className="text-center">
                <button className="btn btn-outline-primary" onClick={handleEditClick}>
                  <i className="fa-solid fa-pen-to-square me-2" /> Edit Profile
                </button>
              </div>
            </>
          )}
        </div>

        {/* Spacer section for future motivational image/quote */}
        <div className="my-5 py-5 text-center" style={{ borderTop: "1px solid #ccc" }}>
          <p className="text-muted fst-italic">✨ “Discipline is choosing between what you want now and what you want most.”</p>
          {/* You can replace this <p> with an <img src="..." /> or quote card */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
