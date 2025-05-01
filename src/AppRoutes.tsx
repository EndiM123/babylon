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
          <WordTransitionSection />
          <DualPromoSection />
          <ProductCarousel />
          <MediaShowcaseSection />
          <section className="babylon-content" ref={contentRef}>
            <div className="babylon-content-inner">
              <h2>LONDON-BASED CREATOR OF STRIKING VISUALS & TIMELESS STORIES.</h2>
              <p>
                Babylon is a modern, luxury fashion house inspired by editorial minimalism and timeless elegance. Our collections are designed to elevate everyday moments with premium materials, mindful craftsmanship, and a signature color palette.
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
