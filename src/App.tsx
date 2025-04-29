import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { COLORS, FONTS } from './theme';

import WordTransitionSection from './WordTransitionSection';
import DualPromoSection from './DualPromoSection';
import ProductCarousel from "./ProductCarousel";
import MediaShowcaseSection from "./MediaShowcaseSection";

const NAV_ITEMS = ['HOME', 'ABOUT', 'SHOP', 'BLOG', 'CART'];
const IMAGES = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
];

function App() {
  // Phase state: 0 = hero, 1 = gallery mask, 2 = logo in header
  const [phase, setPhase] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Listen to scroll and update phase
  useEffect(() => {
    function onScroll() {
      const hero = heroRef.current;
      const gallery = galleryRef.current;
      const content = contentRef.current;
      if (!hero || !gallery || !content) return;
      const scrollY = window.scrollY;
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const galleryBottom = gallery.offsetTop + gallery.offsetHeight;
      if (scrollY < heroBottom - window.innerHeight / 2) {
        setPhase(0);
      } else if (scrollY < galleryBottom - window.innerHeight / 2) {
        setPhase(1);
      } else {
        setPhase(2);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animation classes
  const titleClass =
    phase === 0
      ? 'babylon-title hero'
      : phase === 1
      ? 'babylon-title mask'
      : 'babylon-title to-header';

  return (
    <div className="babylon-root" style={{ background: COLORS.darkGreen, minHeight: '100vh' }}>
      {/* Fixed Header - NO logo until transition is complete */}
      <header className="babylon-header">
        <div className="babylon-header-inner">
          <div className="babylon-header-logo-space">
            {phase === 2 && (
              <span className="babylon-header-logo">BABYLON</span>
            )}
          </div>
          <nav className="babylon-nav">
            {NAV_ITEMS.map((item) => (
              <span key={item} className="babylon-nav-item">
                {item}
              </span>
            ))}
          </nav>
        </div>
      </header>
      {/* Hero Section */}
      <section className="babylon-hero" ref={heroRef}>
  <div className={titleClass}>
    {/* Phase 1: Solid title, Phase 2: Masked */}
    {phase !== 1 ? (
      <span className="babylon-title-solid" style={{ color: COLORS.linen, fontFamily: 'Wolmer, sans-serif', fontWeight: 900, letterSpacing: '-0.04em' }}>BABYLON</span>
    ) : (
      <svg
        className="babylon-title-mask-svg"
        viewBox="0 0 1200 300"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="babylon-img-pattern"
            patternUnits="userSpaceOnUse"
            width="1200"
            height="300"
          >
            {IMAGES.map((src, idx) => (
              <image
                key={src}
                href={src}
                x={idx * 400}
                y="0"
                width="400"
                height="300"
                style={{ borderRadius: '2vw' }}
                preserveAspectRatio="xMidYMid slice"
              />
            ))}
          </pattern>
        </defs>
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          fontFamily={FONTS.brand}
          fontWeight="900"
          fontSize="220"
          fill="url(#babylon-img-pattern)"
          letterSpacing="-10"
        >
          BABYLON
        </text>
      </svg>
    )}
  </div>
</section>
      {/* Word Transition Section: Video visualization */}
      <WordTransitionSection />

      {/* Dual Promo Section: Appears immediately after video visualization */}
      <DualPromoSection />

      {/* Melting Grid Section: Four geometric squares with melting effect */}
      

      {/* Product Carousel: Horizontally fixed product gallery */}
      <ProductCarousel />
      <MediaShowcaseSection />

      {/* Main content follows */}
      <section className="babylon-content" ref={contentRef}>
        <div className="babylon-content-inner">
          <h2>LONDON-BASED CREATOR OF STRIKING VISUALS & TIMELESS STORIES.</h2>
          <p>
            Based in the heart of London, Babylon is a passionate fashion brand and visual storyteller, crafting captivating images that blend artistry with authenticity. From iconic cityscapes to intimate editorials, our work is a reflection of bold creativity and attention to detail.
          </p>
          <button className="babylon-cta">LET'S TALK</button>
        </div>
      </section>

    </div>
  );
}

export default App;
