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
import Footer from './Footer';

export default function AppRoutes({ contentRef }: { contentRef?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <Routes>
      <Route path="/" element={
        <>
          {/* Hero Section */}
          <WordTransitionSection />
          <DualPromoSection />
          <ProductCarousel />
          <MediaShowcaseSection />
          <Footer />
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
