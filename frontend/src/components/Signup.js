import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../images/img.jpeg'; // Update path if needed

function Signup() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    height: '', weight: '', age: '', gender: '',
    goalWeight: '', goalType: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('❌ Passwords do not match!');
      return;
    }

    const payload = {
      ...form,
      height: Number(form.height),
      weight: Number(form.weight),
      age: Number(form.age),
      goalWeight: Number(form.goalWeight),
    };

    delete payload.confirmPassword; // Don't send this to backend

    try {
      const response = await fetch('http://localhost:5000/api/auth/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/login');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        overflow: 'auto',
        paddingTop: '60px',
        paddingBottom: '60px',
      }}
    >
      <div className="container d-flex justify-content-center align-items-center">
        <div
          className="card p-4 shadow-lg rounded-4 bg-white bg-opacity-75"
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <h2 className="text-center fw-bold mb-1">Welcome to Fit-Track!</h2>
          <p className="text-center text-muted mb-4">Make every diet and workout count!</p>

          {error && (
            <div className="alert alert-danger text-center fw-semibold py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {['name', 'email', 'height', 'weight', 'age'].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label fw-semibold">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  className="form-control"
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  👁️
                </span>
              </div>
            </div>

            {/* Confirm Password */}
         {/* Confirm Password */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className="form-control"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  👁️
                </span>
              </div>
            </div>


            <div className="mb-3">
              <label className="form-label fw-semibold">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Goal Type</label>
              <select
                className="form-select"
                name="goalType"
                value={form.goalType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="lose">Lose Weight</option>
                <option value="gain">Gain Weight</option>
                <option value="maintain">Maintain Weight</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Goal Weight (kg)</label>
              <input
                type="number"
                name="goalWeight"
                className="form-control"
                value={form.goalWeight}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold">
              Sign Up
            </button>

            <p className="mt-3 text-center">
              Already registered?{' '}
              <span
                className="text-primary fw-semibold"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/login')}
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
