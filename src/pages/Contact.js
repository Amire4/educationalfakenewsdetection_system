import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [method, setMethod] = useState('email'); // 'email' or 'whatsapp'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Email submit through backend API
  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      return { success: data.success, message: data.message };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, message: 'Network error. Backend running?' };
    }
  };

  // WhatsApp submit (opens WhatsApp directly)
  const sendWhatsApp = () => {
    const phoneNumber = '923110701609'; // Your WhatsApp number
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    if (method === 'email') {
      // Email via backend
      const result = await sendEmail();
      if (result.success) {
        setSuccess('✅ Message sent successfully via Email! We will contact you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(`❌ ${result.message}`);
      }
    } else {
      // WhatsApp direct
      sendWhatsApp();
      setSuccess('💬 Opening WhatsApp... Please send the message.');
      // Don't clear form for WhatsApp so user can copy if needed
      setTimeout(() => {
        setSuccess('');
      }, 5000);
    }

    setLoading(false);
    
    // Clear success/error after 5 seconds
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 5000);
  };

  return (
    <>
      <Navbar />
      
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="contact-section">
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <div><h3>Address</h3><p>Pakistan</p></div>
            </div>
            <div className="info-card">
              <div className="info-icon">📧</div>
              <div><h3>Email</h3><p>ranaamirshahzad630@gmail.com</p></div>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <div><h3>Phone</h3><p>+92 3110701609</p></div>
            </div>
            <div className="info-card">
              <div className="info-icon">💬</div>
              <div><h3>WhatsApp</h3><p>+92 3110701609</p></div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send us a message</h2>
            <p className="form-subtitle">Choose your preferred method</p>
            
            {/* Method Selection Buttons */}
            <div style={styles.methodContainer}>
              <button
                type="button"
                onClick={() => setMethod('email')}
                style={{
                  ...styles.methodBtn,
                  background: method === 'email' ? '#ef4444' : '#e5e7eb',
                  color: method === 'email' ? 'white' : '#374151',
                  border: method === 'email' ? 'none' : '1px solid #d1d5db'
                }}
              >
                📧 Send via Email
              </button>
              <button
                type="button"
                onClick={() => setMethod('whatsapp')}
                style={{
                  ...styles.methodBtn,
                  background: method === 'whatsapp' ? '#25D366' : '#e5e7eb',
                  color: method === 'whatsapp' ? 'white' : '#374151',
                  border: method === 'whatsapp' ? 'none' : '1px solid #d1d5db'
                }}
              >
                💬 Send via WhatsApp
              </button>
            </div>
            
            {success && (
              <div style={{
                background: '#d1fae5',
                color: '#065f46',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {success}
              </div>
            )}
            
            {error && (
              <div style={{
                background: '#fee2e2',
                color: '#991b1b',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label>Your Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter subject"
                />
              </div>
              
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Enter your message"
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : `Send via ${method === 'email' ? 'Email' : 'WhatsApp'}`}
                </button>
                <button 
                  type="button" 
                  className="reset-btn"
                  onClick={() => setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                  })}
                >
                  Reset
                </button>
              </div>
            </form>
            
            <p style={{
              textAlign: 'center',
              marginTop: '1rem',
              fontSize: '0.8rem',
              color: '#64748b'
            }}>
              {method === 'email' 
                ? '📧 We will respond to your email within 24 hours' 
                : '💬 Clicking Send will open WhatsApp - just press send'}
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

const styles = {
  methodContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    justifyContent: 'center'
  },
  methodBtn: {
    flex: 1,
    padding: '0.8rem',
    border: 'none',
    borderRadius: '50px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  }
};

export default Contact;