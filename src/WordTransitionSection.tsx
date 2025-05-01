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
      <video
  className="word-transition-video"
  src="/endi.mp4"
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  controls={false}
  disablePictureInPicture
  onContextMenu={e => e.preventDefault()}
/>
        <div className="word-transition-overlay" />
        <div className="word-transition-content">
          <span className="word-transition-main">BABYLON</span>
        </div>
      </div>
    </section>
  );
}