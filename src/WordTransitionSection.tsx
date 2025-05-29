import React from 'react';
import './WordTransitionSection.css';

export default function WordTransitionSection() {
  React.useEffect(() => {
    const el = document.querySelector('.word-transition-video');
    if (el) el.removeAttribute('controls');
  }, []);
  return (
    <section className="word-transition-section">
      <div id="video-banner">
        <video
          src="/endi.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="centered-title">
          <span className="word-transition-main">BABYLON</span>
          <p className="subtitle">shaping the way the city looks since 2012</p>
        </div>
      </div>
    </section>
  );
}