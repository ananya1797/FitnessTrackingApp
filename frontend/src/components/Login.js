import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../images/hamster.jpeg'; // ✅ Update if needed

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.authToken) {
        localStorage.setItem('token', data.authToken);
        console.log('✅ Login successful, token saved:', data.authToken);
        navigate('/home');
      } else {
        setError(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow rounded-4 overflow-hidden w-100" style={{ maxWidth: '900px' }}>
        
        {/* Left - Image */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-white p-0">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="img-fluid h-100 w-100"
            style={{
              objectFit: 'cover',
              borderTopLeftRadius: '1rem',
              borderBottomLeftRadius: '1rem'
            }}
          />
        </div>

        {/* Right - Form */}
        <div className="col-md-6 bg-white p-5">
          <h2 className="text-center text-success fw-bold mb-2">Welcome to Fit-Track</h2>
          <p className="text-center text-muted mb-4">Make every workout & diet count!</p>

          {error && (
            <div className="alert alert-danger text-center fw-semibold py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  👁️
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
