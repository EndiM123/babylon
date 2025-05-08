import React, { useRef, useState, useEffect } from 'react';
import './SeaStarLoop.css';

const STARS = Array.from({ length: 10 }, () => '/seastar.png');

export default function SeaStarLoop() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowWidth, setRowWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (rowRef.current) {
        setRowWidth(rowRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section className="sea-star-section">
      <div className="sea-star-carousel-outer" style={{ overflow: 'hidden', width: '100vw' }}>
        <div
          className="sea-star-carousel-inner"
          style={{
            width: rowWidth ? rowWidth * 2 : undefined,
            animationDuration: rowWidth ? `${rowWidth / 90}s` : undefined,
          }}
        >
          <div className="sea-star-row" ref={rowRef}>
            {STARS.map((src, idx) => (
              <div className="sea-star-box" key={`a${idx}`}>
                <img src={src} alt="Sea Star" className="sea-star-img" draggable="false" />
              </div>
            ))}
          </div>
          <div className="sea-star-row">
            {STARS.map((src, idx) => (
              <div className="sea-star-box" key={`b${idx}`}>
                <img src={src} alt="Sea Star" className="sea-star-img" draggable="false" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
