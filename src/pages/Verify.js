import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/verify.css';

function Verify() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
      const scrollHeight = textareaRef.current.scrollHeight;
      if (scrollHeight > 48 && scrollHeight <= 100) {
        textareaRef.current.style.height = scrollHeight + 'px';
      }
    }
  }, [text]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setFileName(file.name);
    }
  };

  const removeImage = () => {
    setImage(null);
    setFileName('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleVerify(e);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!text && !image) {
      alert('Please enter text or upload an image');
      return;
    }

    setLoading(true);
    setResult(null);
    setScore(null);

    try {
      let response;
      const token = localStorage.getItem('token');

      if (image) {
        const formData = new FormData();
        if (text) formData.append('text', text);
        formData.append('image', image);

        response = await axios.post('http://127.0.0.1:5000/api/predict', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        response = await axios.post('http://127.0.0.1:5000/api/predict', {
          text: text
        }, {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        });
      }

      const data = response.data || {};
      
      const isFake = data.is_fake;
      const confidence = data.confidence || 0;
      const message = data.message || '';
      
      const confidencePercent = confidence * 100;
      setScore(confidencePercent);

      if (isFake === false) {
        setResult({ 
          type: 'real', 
          text: `✅ REAL NEWS: ${message || 'This content appears authentic and reliable.'}` 
        });
      } else if (isFake === true) {
        setResult({ 
          type: 'fake', 
          text: `⚠️ FAKE NEWS: ${message || 'This content is likely misleading or fake.'}` 
        });
      } else {
        setResult({ type: 'error', text: 'Unable to analyze content.' });
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setResult({ 
            type: 'error', 
            text: '❌ Please login first to verify news!' 
          });
        } else {
          setResult({ 
            type: 'error', 
            text: 'Server error: ' + (error.response.data.error || 'Please try again') 
          });
        }
      } else if (error.request) {
        setResult({ 
          type: 'error', 
          text: 'Unable to connect to server. Make sure backend is running on http://127.0.0.1:5000' 
        });
      } else {
        setResult({ type: 'error', text: 'Error: ' + error.message });
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <section className={`verify-hero ${animate ? 'show' : ''}`}>
        <div className="verify-box">
          <h1>News Verification</h1>
          <p>Enter text — AI-powered fact checking</p>

          <form onSubmit={handleVerify}>
            <div className="composer">
              <textarea
                ref={textareaRef}
                placeholder="Enter news text to verify..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows="1"
              />
              
              <label className="attach-btn">
                📎
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              <button type="submit" disabled={loading}>
                {loading ? '⏳ Analyzing...' : '🔍 Verify News'}
              </button>
            </div>
          </form>

          {fileName && (
            <div className="file-preview">
              <span>🖼️ {fileName} ({(image?.size / 1024).toFixed(1)} KB)</span>
              <button type="button" className="remove-file" onClick={removeImage}>
                ✕
              </button>
            </div>
          )}

          {result?.text && (
            <div className={`result-box ${result.type}`}>
              <p>{result.text}</p>
              {score !== null && (
                <div className="confidence-score">
                  <p>Confidence Score: <strong>{score.toFixed(1)}%</strong></p>
                  <div className="confidence-bar">
                    <div 
                      className="confidence-fill"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Verify;