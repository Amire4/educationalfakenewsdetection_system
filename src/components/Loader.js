import React from 'react';
import '../styles/loader.css';

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
