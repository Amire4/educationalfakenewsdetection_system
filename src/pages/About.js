import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/about.css';

function About() {
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    setAnimateKey(prev => prev + 1);
  }, []);

  // Tech stack data with links
  const technologies = [
    { name: 'React.js', url: 'https://reactjs.org/', icon: '⚛️' },
    { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', icon: '📜' },
    { name: 'CSS3', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', icon: '🎨' },
    { name: 'Frontend Architecture', url: 'https://reactjs.org/docs/thinking-in-react.html', icon: '🏗️' },
    { name: 'UI/UX Design', url: 'https://www.interaction-design.org/', icon: '🎯' },
  ];

  const handleTechClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div key={animateKey} className="about-wrapper">
      <Navbar />

      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Education Verification</h1>
          <p>
            EduVerify is an educational platform built to help students, teachers, and researchers
            identify fake news, verify educational content, and develop strong digital awareness
            in the modern information age.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="project-overview">
          <h2>Project Overview</h2>
          <p>
            EduVerify was created in response to the growing problem of misinformation in the education sector.
            Every day, students in Pakistan encounter fake admissions, false scholarship announcements,
            misleading results, and manipulated academic news.
          </p>
          <p>
            This platform provides a reliable space where users can verify suspicious content, understand
            the credibility of sources, and learn how misinformation spreads. Our goal is not only detection,
            but education and long-term awareness.
          </p>
          <p>
            By combining technology with digital literacy, EduVerify supports users in making informed
            decisions and trusting only verified educational information.
          </p>
        </div>

        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to strengthen digital awareness among students and educators in Pakistan.
            We believe access to accurate information is a right, and education should never be
            influenced by manipulation or misinformation.
          </p>
        </div>

        <div className="tech-stack">
          <h2>Technology Stack</h2>
          <div className="tech-list">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="tech-badge"
                onClick={() => handleTechClick(tech.url)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleTechClick(tech.url)}
              >
                <span className="tech-icon">{tech.icon}</span>
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        <div className="team-section">
          <h2>Meet the Team</h2>

          <div className="team-grid">
            <div className="team-card">
              <div className="member-avatar">👤</div>
              <h3>Rana Amir Shahzad</h3>
              <p>Frontend Developer</p>
              <span className="role-tag">React & UI Design</span>
              <div className="team-social">
                
              </div>
            </div>

            <div className="team-card">
              <div className="member-avatar">👤</div>
              <h3>Waqar Ul Hassan</h3>
              <p>Database Specialist</p>
              <span className="role-tag">Data Management</span>
              <div className="team-social"> 
              </div>
            </div>

            <div className="team-card">
              <div className="member-avatar">👤</div>
              <h3>Hamid Ali</h3>
              <p>Backend Developer</p>
              <span className="role-tag">Server & Logic</span>
              <div className="team-social"> 
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;