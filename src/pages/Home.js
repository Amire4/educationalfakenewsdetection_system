import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../styles/home.css";

import img1 from "../assets/Arti.jpg";
import img2 from "../assets/students.jpg";
import img3 from "../assets/f news.jpg";
import img4 from "../assets/search.jpg";
import img5 from "../assets/da analyst.jpg";
import img6 from "../assets/verifye.jpg";
import img7 from "../assets/classroom.jpg";
import img8 from "../assets/security.jpg";
import img9 from "../assets/ONLINE.jpg";


import g1 from '../assets/gallery/technology.jpg';
import g2 from '../assets/gallery/Machine-Learning-Models.jpg';
import g3 from '../assets/gallery/DClass.jpg';
import g4 from '../assets/gallery/data.jpg';
import g5 from '../assets/gallery/security.jpg';
import g6 from '../assets/gallery/Fact-Checking.jpg';
import g7 from '../assets/gallery/smart-learning-i.jpg';
import g8 from '../assets/gallery/collab.jpg';


function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-pro">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Educational Fake News Detection Platform</h1>
            <p>
              A smart platform designed to help students and educators identify misinformation, 
              verify educational content, and promote digital awareness using Artificial Intelligence.
            </p>
            <Link to="/verify" className="btn-main">Verify News</Link>
          </div>

          <div className="hero-image">
            <img src={img1} alt="AI Education" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>Why This Platform Matters</h2>
        <p>
          Fake educational news is spreading rapidly on social media. This project helps students, teachers,
          and institutions protect themselves by providing intelligent verification tools and awareness resources.
        </p>
      </section>

      {/* FEATURES */}
      <section className="features-pro">
        <h2>Core Features</h2>

        <div className="features-grid">
          <div className="feature-box">
            <img src={img6} alt="Verify" />
            <h3>Instant News Verification</h3>
            <p>Instant News Verification helps users quickly check whether educational news is real or misleading by using AI-powered analysis. Instead of relying on guesswork or rumors, students and teachers can paste content into the system and receive an intelligent assessment based on patterns, language, and credibility signals. This makes it easier to avoid confusion, stop the spread of misinformation,
               and make informed decisions before trusting or sharing educational information online.</p>
          </div>

          <div className="feature-box">
            <img src={img2} alt="Students" />
            <h3>Student Awareness</h3>
            <p>Focuses on educating young people about how misinformation spreads on social media and online platforms. It helps students understand common tricks such as misleading headlines, false claims, and manipulated content. 
              By building critical thinking skills and digital responsibility, the platform encourages students to question information, verify sources, and make safer decisions when consuming or sharing educational news.
</p>
          </div>

          <div className="feature-box">
            <img src={img3} alt="Fake News" />
            <h3>Fake News Identification</h3>
            <p>Fake News Identification enables the system to recognize misleading headlines and manipulative educational content before it can confuse students or educators.
               By analyzing language patterns, exaggerated claims, and unreliable sources, the platform helps users understand whether the information is trustworthy. This supports more responsible online behavior and reduces the risk of spreading false educational information.</p>
          </div>

          <div className="feature-box">
            <img src={img4} alt="Research" />
            <h3>Research Based System</h3>
            <p>Research Based System means the platform is built using real research and proper academic methods, not random guesses. Experts study how fake news works and use that knowledge to design the system. 
              This helps make the results more reliable and useful for students and teachers.
</p>
          </div>

          <div className="feature-box">
            <img src={img5} alt="Data Insights" />
            <h3>Data Driven Insights</h3>
            <p>System looks at data patterns to understand how fake news usually appears. It does not just say true or false, 
              but analyzes the content to give smarter and more meaningful results. This helps users better understand why a piece of information can be trusted or doubted.
.</p>
          </div>

          <div className="feature-box">
            <img src={img7} alt="Teachers" />
            <h3>For Teachers & Institutions</h3>
            <p>This platform helps schools, colleges, and universities check the accuracy of announcements,
               posts, and educational information before sharing it with students. It supports educators in preventing the spread of false information and helps maintain trust in the education system.
</p>
          </div>

          <div className="feature-box">
  <img src={img1} alt="AI Detection" />
  <h3>AI Powered Detection</h3>
  <p>
   Artificial Intelligence to understand and analyze educational news automatically. It looks for patterns that usually appear in fake information and helps
    detect misleading content more accurately than manual checking. This saves time and improves reliability for users.

  </p>
</div>

<div className="feature-box">
  <img src={img8} alt="Security" />
  <h3>Safe & Trusted Platform</h3>
  <p>
   This platform is a safe and reliable place where users can check 
   information without worrying about being misled. It is designed to protect students and other users from false or harmful content, making it easier to learn and explore news and information confidently. By creating a secure environment, it ensures that everyone can verify facts and make informed decisions without fear of manipulation.
  </p>
</div>

<div className="feature-box">
  <img src={img9} alt="Knowledge Hub" />
  <h3>Educational Knowledge Hub</h3>
  <p>
   The platform also serves as an educational hub, providing useful content, guidance, and learning materials. 
   It helps users understand what fake news is, how it spreads, and how to recognize it. At the same time, it encourages critical thinking, teaching users to question information and make smart choices about what they read or share. This way, students and learners can improve their 
   skills in analyzing and verifying information effectively.
  </p>
</div>

        </div>
      </section>

      {/* IMAGE GALLERY */}
   {/* IMAGE GALLERY */}
<section className="gallery">
  <h2>Our Vision in Action</h2>

  <div className="gallery-grid">
    <img src={g1} alt="Smart digital classroom" />
    <img src={g2} alt="AI education system" />
    <img src={g3} alt="Students practicing critical thinking" />
    <img src={g4} alt="Data analysis dashboard" />
    <img src={g5} alt="Cyber security and data protection" />
    <img src={g6} alt="Fact checking online news" />
    <img src={g7} alt="Student learning online" />
    <img src={g8} alt="Research team collaboration" />
  </div>
</section>


      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Start Verifying Educational News Today</h2>
        <p>
          Protect yourself and others from misleading educational information. 
          Use our intelligent verification system now.
        </p>
        <Link to="/verify" className="btn-main">Get Started</Link>
      </section>

      <Footer />
    </>
  );
}

export default Home;
