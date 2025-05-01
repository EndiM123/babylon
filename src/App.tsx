import React, { useRef, useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import './global-video-override.css';
import { COLORS, FONTS } from './theme';
import AppRoutes from './AppRoutes';


const NAV_ITEMS = ['HOME', 'SHOP', 'ABOUT', 'BLOG', 'CART'];
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
    <>

      <div className="babylon-root" style={{ background: COLORS.darkGreen, minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        {/* Fixed Header - NO logo until transition is complete */}
        <header className="babylon-header" style={{ position: 'relative', zIndex: 2 }}>
          <div className="babylon-header-inner">
            <div className="babylon-header-logo-space">
              {phase === 2 && (
                <span className="babylon-header-logo">BABYLON</span>
              )}
            </div>
            <nav className="babylon-nav">
              <Link to="/" className="babylon-nav-item">HOME</Link>
              <Link to="/shop" className="babylon-nav-item">SHOP</Link>
              <Link to="/about" className="babylon-nav-item">ABOUT</Link>
              <Link to="/blog" className="babylon-nav-item">BLOG</Link>
              <Link to="/cart" className="babylon-nav-item">CART</Link>
            </nav>
          </div>
        </header>
        <AppRoutes contentRef={contentRef} />
      </div>
    </>
  );
}

export default App;
