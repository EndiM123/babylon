import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from './Shop';
import Solira from './Solira';
import ProductDetail from './ProductDetail';
import { PRODUCTS } from './ProductDetail';
import DualPromoSection from './DualPromoSection';
import ProductCarousel from './ProductCarousel';
import MediaShowcaseSection from './MediaShowcaseSection';
import WordTransitionSection from './WordTransitionSection';
import Footer from './Footer';
import BlogSection from './BlogSection';
import BlogPost from './BlogPost';

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
      {/* Product detail route */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/about" element={<Solira />} />
      <Route path="/blog" element={<BlogSection />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  );
}
