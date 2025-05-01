import React from 'react';
import './WordTransitionSection.css';

export default function WordTransitionSection() {
  React.useEffect(() => {
    const el = document.querySelector('.word-transition-video');
    if (el) el.removeAttribute('controls');
  }, []);
  return (
    <section className="word-transition-section">
      <div className="word-transition-box">
        <img
          className="word-transition-image"
          src="/endi.png"
          alt="Landing background"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        />
        <div className="word-transition-overlay" />
        <div className="word-transition-content">
          <span className="word-transition-main">BABYLON</span>
        </div>
      </div>
    </section>
  );
}