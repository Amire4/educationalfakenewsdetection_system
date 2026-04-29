import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signInWithGoogle, signInWithFacebook, signInWithEmail } from '../services/firebase';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signInWithEmail(email, password);
    
    if (result.success) {
      login(result.user, result.user.uid);
      navigate('/');
    } else {
      setError(result.error);
      alert(result.error);
    }
    
    setLoading(false);
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    const result = await signInWithGoogle();
    
    if (result.success) {
      login(result.user, result.user.uid);
      navigate('/');
    } else {
      setError(result.error);
      alert(result.error);
    }
    
    setLoading(false);
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    setLoading(true);
    setError('');
    
    const result = await signInWithFacebook();
    
    if (result.success) {
      login(result.user, result.user.uid);
      navigate('/');
    } else {
      setError(result.error);
      alert(result.error);
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
          
          {error && <div className="error-message" style={{color: 'red', marginBottom: '10px', textAlign: 'center'}}>{error}</div>}
          
          <form onSubmit={handleLogin} autoComplete="off">
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
            
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging...' : 'Login'}
            </button>
          </form>
          
          {/* Social Login Buttons */}
          <div className="social-login">
            <span>or login with</span>
            <div className="social-icons">
              <button 
                onClick={handleFacebookLogin} 
                className="facebook social-btn"
                disabled={loading}
              >
                <FaFacebookF />
              </button>
              
              <button 
                onClick={handleGoogleLogin} 
                className="google social-btn"
                disabled={loading}
              >
                <FaGoogle />
              </button>
              
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="linkedin social-btn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          
          <div className="signup-link">
            Don't have an account? <Link to="/auth">Sign up</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;