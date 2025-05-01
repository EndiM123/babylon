import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from './Shop';
import About from './About';
import ProductDetail from './ProductDetail';
import { PRODUCTS } from './ProductDetail';
import DualPromoSection from './DualPromoSection';
import ProductCarousel from './ProductCarousel';
import MediaShowcaseSection from './MediaShowcaseSection';
import WordTransitionSection from './WordTransitionSection';

export default function AppRoutes({ contentRef }: { contentRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <Routes>
      <Route path="/" element={
        <>
          {/* Hero Section */}
          <div className="word-transition-box">
            <video
  className="word-transition-video"
  src="/word-transition-bg.mp4"
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  style={{ width: '100%', height: '100vh', objectFit: 'cover', pointerEvents: 'none' }}
></video>
            <div className="word-transition-overlay" style={{ background: 'rgba(0, 0, 0, 0.1)' }}></div>
            <div className="word-transition-content" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <span className="word-transition-main" style={{ fontFamily: 'Wolmer, sans-serif', fontWeight: 700, fontSize: '10vw', color: '#FAF5F0', textAlign: 'center' }}>BABYLON</span>
            </div>
          </div>
          <DualPromoSection />
          <ProductCarousel />
          <MediaShowcaseSection />
          <section className="babylon-content" ref={contentRef}>
            <div className="babylon-content-inner">
              <h2>LONDON-BASED CREATOR OF STRIKING VISUALS & TIMELESS STORIES.</h2>
              <p>
                Based in the heart of London, Babylon is a passionate fashion brand and visual storyteller, crafting captivating images that blend artistry with authenticity. From iconic cityscapes to intimate editorials, our work is a reflection of bold creativity and attention to detail.
              </p>
              <button className="babylon-cta">LET'S TALK</button>
            </div>
          </section>
        </>
      } />
      <Route path="/shop" element={<Shop />} />
      {/* Explicit routes for each product */}
      {PRODUCTS.map((product: { id: number }) => (
        <Route
          key={product.id}
          path={`/product/${product.id}`}
          element={<ProductDetail />}
        />
      ))}
      {/* Dynamic fallback for direct access or unknown ids */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
