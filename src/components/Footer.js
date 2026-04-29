import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          © 2025 EduVerify. All Rights Reserved. | Developed by Rana Amir |{" "}
          <Link to="/contact">Contact Us</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
