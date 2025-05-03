import React, { useEffect, useRef, useState } from 'react';
import './SoliraSlideshow.css';

// Replace with your actual curated Solira campaign images (WebP/AVIF)
const SLIDES = [
  {
    src: '/solira1.png',
    alt: 'Solira Summer Collection - Look 1',
    srcSet: '/solira1.png 800w, /solira1.png 1600w, /solira1.png 2400w',
    type: 'image/png',
  },
  {
    src: '/solira2.png',
    alt: 'Solira Summer Collection - Look 2',
    srcSet: '/solira2.png 800w, /solira2.png 1600w, /solira2.png 2400w',
    type: 'image/png',
  },
  {
    src: '/solira3.png',
    alt: 'Solira Summer Collection - Look 3',
    srcSet: '/solira3.png 800w, /solira3.png 1600w, /solira3.png 2400w',
    type: 'image/png',
  },
  {
    src: '/solira4.png',
    alt: 'Solira Summer Collection - Look 4',
    srcSet: '/solira4.png 800w, /solira4.png 1600w, /solira4.png 2400w',
    type: 'image/png',
  },
  {
    src: '/solira6.png',
    alt: 'Solira Summer Collection - Look 5',
    srcSet: '/solira6.png 800w, /solira6.png 1600w, /solira6.png 2400w',
    type: 'image/png',
  },
  {
    src: '/solira6.png',
    alt: 'Solira Summer Collection - Look 6',
    srcSet: '/solira6.png 800w, /solira6.png 1600w, /solira6.png 2400w',
    type: 'image/png',
  },
  {
    src: '/solira7.png',
    alt: 'Solira Summer Collection - Look 7',
    srcSet: '/solira7.png 800w, /solira7.png 1600w, /solira7.png 2400w',
    type: 'image/png',
  },
  {
    src: '/solira8.png',
    alt: 'Solira Summer Collection - Look 8',
    srcSet: '/solira8.png 800w, /solira8.png 1600w, /solira8.png 2400w',
    type: 'image/png',
  },
  {
    src: '/solira9.png',
    alt: 'Solira Summer Collection - Look 9',
    srcSet: '/solira9.png 800w, /solira9.png 1600w, /solira9.png 2400w',
    type: 'image/png',
  },
  {
    src: '/solira10.png',
    alt: 'Solira Summer Collection - Look 10',
    srcSet: '/solira10.png 800w, /solira10.png 1600w, /solira10.png 2400w',
    type: 'image/png',
  },
];

export default function SoliraSlideshow() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(Array(SLIDES.length).fill(false));
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Preload all images on mount for seamless transitions
  useEffect(() => {
    SLIDES.forEach((slide, idx) => {
      const img = new window.Image();
      img.src = slide.src;
      img.srcset = slide.srcSet;
      img.onload = () => {
        setLoaded(prev => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      };
    });
  }, []);

  // Cycle slides every 3s
  useEffect(() => {
    timer.current = setTimeout(() => {
      setActive(a => (a + 1) % SLIDES.length);
    }, 3000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active]);

  return (
    <section className="solira-slideshow">
      {SLIDES.map((slide, idx) => (
        <picture
          key={slide.src}
          className={`solira-slide${active === idx ? ' active' : ''}`}
          style={{
            zIndex: active === idx ? 2 : 1,
            opacity: loaded[idx] ? (active === idx ? 1 : 0) : 0,
            pointerEvents: 'none',
          }}
        >
          <source
            srcSet={slide.srcSet}
            type={slide.type}
            sizes="100vw"
          />
          <img
            src={slide.src}
            srcSet={slide.srcSet}
            alt={slide.alt}
            className="solira-slide-img"
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              objectPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)',
              willChange: 'opacity',
              background: '#F7EFE5',
              display: 'block',
            }}
            draggable={false}
            decoding="async"
            loading="eager"
            fetchPriority="high"
          />
          {/* Overlay for slide 1 */}
          {idx === 0 && (
            <div className="solira-slide-overlay solira-slide-overlay-1">
              <span className="solira-slide-intro">INTRODUCING</span>
            </div>
          )}
          {/* Overlay for slide 2 */}
          {idx === 1 && (
            <div className="solira-slide-overlay solira-slide-overlay-2">
              <span className="solira-slide-babylon">BABYLON</span>
              <span className="solira-slide-solira">SOLIRA 2025</span>
              <span className="solira-slide-collection">COLLECTION</span>
            </div>
          )}
        </picture>
      ))}
    </section>
  );
}
