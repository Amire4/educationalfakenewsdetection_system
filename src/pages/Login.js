import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginAPI } from '../services/api';
import { signInWithGoogle, signInWithFacebook } from '../services/firebase';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ BACKEND EMAIL LOGIN (Pehle jaisa)
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginAPI({ email, password });
      const { access_token, user } = response.data;
      login(user, access_token);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.detail || 'Invalid email or password';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN (Firebase)
  const handleGoogleLogin = async () => {
    setLoading(true);
    const result = await signInWithGoogle();
    if (result.success) {
      login(result.user, result.user.uid);
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // ✅ FACEBOOK LOGIN (Firebase)
  const handleFacebookLogin = async () => {
    setLoading(true);
    const result = await signInWithFacebook();
    if (result.success) {
      login(result.user, result.user.uid);
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Login</h2>
          <p>Please login to your account</p>
          
          {error && (
            <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          {/* ✅ BACKEND EMAIL LOGIN FORM */}
          <form onSubmit={handleEmailLogin} autoComplete="off">
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging...' : 'Login'}
            </button>
          </form>
          
          {/* ✅ SOCIAL ICONS - SIRF FIREBASE */}
          <div className="social-login">
            <span>or login with</span>
            <div className="social-icons">
              <button onClick={handleFacebookLogin} className="facebook social-btn">
                <FaFacebookF />
              </button>
              <button onClick={handleGoogleLogin} className="google social-btn">
                <FaGoogle />
              </button>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="linkedin social-btn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          <div className="signup-link">
            <Link to="/auth">Don't have an account? Sign up</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;