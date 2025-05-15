import React, { useState, useEffect } from 'react';
import './ScrollStorySection.css';

const IMAGES = [
  { src: '/bikini1.png', leftText: 'The Awakening', rightText: 'A new dawn in luxury.' },
  { src: '/bikini2.png', leftText: 'The Journey', rightText: 'Elegance in every step.' },
  { src: '/bikini3.png', leftText: 'The Encounter', rightText: 'Where art meets fashion.' },
  { src: '/bikini4.png', leftText: 'The Arrival', rightText: 'Solira, revealed.' },
];

export default function ScrollStorySection() {
  const [current, setCurrent] = useState(0);

  // Automatic slideshow: advance image every 1.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % IMAGES.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="scroll-story-section">
      <div className="scroll-story-content">
        {/* Left text block (desktop) */}
        <div className="scroll-story-text left">
          <div className={`scroll-story-fade ${current === 0 ? 'visible' : ''}`}>{IMAGES[0].leftText}</div>
          <div className={`scroll-story-fade ${current === 1 ? 'visible' : ''}`}>{IMAGES[1].leftText}</div>
          <div className={`scroll-story-fade ${current === 2 ? 'visible' : ''}`}>{IMAGES[2].leftText}</div>
          <div className={`scroll-story-fade ${current === 3 ? 'visible' : ''}`}>{IMAGES[3].leftText}</div>
        </div>
        {/* Image stack */}
        <div className="scroll-story-images">
          {IMAGES.map((img, idx) => (
  <div className="scroll-story-img-pressable" key={img.src}>
    <img
      src={img.src}
      alt={img.leftText}
      loading="lazy"
      className={`scroll-story-img ${current === idx ? 'active' : ''} ${current > idx ? 'below' : ''}`}
      style={{
        zIndex: 100 - idx,
        transform:
          current === idx
            ? 'translateY(0) scale(1)'
            : current > idx
            ? 'translateY(60vh) scale(0.88)'
            : `translateY(-${(idx - current) * 10}vh) scale(${1 - (idx - current) * 0.08})`,
        opacity: current >= idx ? 1 : 0.6,
        transition: 'transform 0.8s cubic-bezier(.7,0,.3,1), opacity 0.6s cubic-bezier(.7,0,.3,1)',
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto',
        pointerEvents: current === idx ? 'auto' : 'none',
        boxShadow: current === idx ? '0 8px 48px 0 rgba(30,20,20,0.14)' : '0 2px 12px 0 rgba(30,20,20,0.06)',
        willChange: 'transform, opacity',
        maxWidth: 'min(480px, 88vw)',
        width: '100%',
        height: 'auto',
        borderRadius: '2.5vw',
      }}
    />
    <div className="scroll-story-img-overlay">
      <span className="scroll-story-img-overlay-text">oh I need this!</span>
    </div>
  </div>
))}
        </div>
        {/* Right text block (desktop) */}
        <div className="scroll-story-text right">
          <div className={`scroll-story-fade ${current === 0 ? 'visible' : ''}`}>{IMAGES[0].rightText}</div>
          <div className={`scroll-story-fade ${current === 1 ? 'visible' : ''}`}>{IMAGES[1].rightText}</div>
          <div className={`scroll-story-fade ${current === 2 ? 'visible' : ''}`}>{IMAGES[2].rightText}</div>
          <div className={`scroll-story-fade ${current === 3 ? 'visible' : ''}`}>{IMAGES[3].rightText}</div>
        </div>
      </div>
    </section>
  );
}
