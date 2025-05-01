import React, { useEffect, useState } from 'react';
import './WordTransitionSection.css';

const WORDS = ['BABYLON'];
const OVERLAY_COLOR = 'rgba(0,0,0,0.10)'; // 10% black overlay

export default function WordTransitionSection() {
  React.useEffect(() => {
    const el = document.querySelector('.word-transition-video');
    if (el) el.removeAttribute('controls');
  }, []);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="word-transition-section">
      <div className="word-transition-box">
      <video
        className="word-transition-video"
        src="/endi_noaudio.mp4"
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