import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

function Auth() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // ✅ Hook component ke top par

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Direct login call - sahi hai
        login(data.user, data.access_token);
        navigate('/');
      } else {
        setError(data.detail || 'Signup failed');
      }
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-left">
        <div className="overlay">
          <h1>Create your free account</h1>
          <p>Join EduVerify and explore trusted educational news across Pakistan.</p>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-card">
          <h2>Sign up</h2>
          <p>Create your account</p>

          {error && (
            <div className="error-message" style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="fullname"
                placeholder="Full name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 chars)"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Sign up'}
            </button>
          </form>

          <div className="signup-links">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;