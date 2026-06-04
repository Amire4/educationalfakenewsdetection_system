import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/verify.css';
import axios from 'axios';

function Verify() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setFileName('');
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
      const token = localStorage.getItem('token');
      let response;

      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        if (text) formData.append('text', text);
        
        response = await axios.post('http://127.0.0.1:5000/api/predict', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        response = await axios.post('http://127.0.0.1:5000/api/predict', {
          news_text: text
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }

      const data = response.data;
      
      if (data.success) {
        setScore(data.confidence);
        setResult({
          type: data.prediction,
          text: data.message
        });
      } else {
        setResult({ type: 'error', text: data.message });
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        setResult({ type: 'error', text: '❌ Please login first to verify news!' });
      } else if (error.request) {
        setResult({ type: 'error', text: 'Unable to connect to server. Make sure backend is running on http://127.0.0.1:5000' });
      } else {
        setResult({ type: 'error', text: 'Server error. Please try again.' });
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="verify-wrapper">
        <section className={`verify-hero ${animate ? 'show' : ''}`}>
          <div className="verify-box">
            <h1>News & Notification Verification</h1>
            <p>Enter text or upload notification image — AI-powered fact checking</p>

            <form onSubmit={handleVerify}>
              <div className="composer">
                <div className="composer-top">
                  <label className="attach-btn">
                    📎
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <textarea
                    ref={textareaRef}
                    placeholder="Enter education-related news text to verify..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="1"
                  />
                </div>

                {fileName && (
                  <div className="file-preview-area">
                    <div className="file-info">
                      <span>🖼️</span>
                      <span className="file-name">{fileName}</span>
                      <span>({(image?.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button type="button" className="remove-file" onClick={removeImage}>
                      ✕
                    </button>
                  </div>
                )}

                <button type="submit" disabled={loading}>
                  {loading ? '⏳ Analyzing...' : '🔍 Verify News'}
                </button>
              </div>
            </form>

            {result?.text && (
              <div className={`result-box ${result.type}`}>
                <p>{result.text}</p>
                {score !== null && score > 0 && (
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
      </div>
      <Footer />
    </>
  );
}

export default Verify;