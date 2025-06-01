import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from './Shop';
import Solira from './Solira';
import SoliraProductDetail from './SoliraProductDetail';
import ProductDetail from './ProductDetail';
// Removed unused import PRODUCTS
import WordTransitionSection from './WordTransitionSection';
import SummerSplitSection from './SummerSplitSection';
import FeaturedProductCarousel from './FeaturedProductCarousel';
import DualPromoSection from './DualPromoSection';
import ProductCarousel from './ProductCarousel';
import MediaShowcaseSection from './MediaShowcaseSection';
import Footer from './Footer';
import BlogSection from './BlogSection';
import BlogPost from './BlogPost';
import RooftopBlogPost from './RooftopBlogPost';
import ImmersiveRooftopBlogPost from './ImmersiveRooftopBlogPost';
import ImmersiveCoffeeCultureBlogPost from './ImmersiveCoffeeCultureBlogPost';
import EditorialCoffeeBlogPost from './EditorialCoffeeBlogPost';
import PrishtinaPoolsideBlogPost from './PrishtinaPoolsideBlogPost';
import GreenCoastBlogPost from './GreenCoastBlogPost';
import GreenCoastVisualBlogPost from './GreenCoastVisualBlogPost';
import ColorPsychologyBlogPost from './ColorPsychologyBlogPost';
import MonacoGrandPrixFashionBlogPost from './MonacoGrandPrixFashionBlogPost';
import MonacoImmersiveExperience from './MonacoImmersiveExperience';
import CheckoutPage from './components/CheckoutPage';
import BlogHighlights from './components/BlogHighlights';
import BrandValues from './components/BrandValues';

export default function AppRoutes({ contentRef }: { contentRef?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <Routes>
      <Route path="/" element={
        <>
          {/* Hero Section */}
          <WordTransitionSection />
          <SummerSplitSection />
          <FeaturedProductCarousel />
          <DualPromoSection />
          <ProductCarousel />
          <BlogHighlights />
          <MediaShowcaseSection />
          <BrandValues />
          <Footer />
        </>
      } />
      <Route path="/shop" element={<Shop />} />
      {/* Product detail route */}
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/about" element={<Solira />} />
      <Route path="/solira/product/:id" element={<SoliraProductDetail />} />
      <Route path="/blog" element={<BlogSection />} />
      <Route path="/blog/rooftop" element={<RooftopBlogPost />} />
      <Route path="/blog/immersive-rooftop" element={<ImmersiveRooftopBlogPost />} />
      <Route path="/blog/coffee-culture" element={<ImmersiveCoffeeCultureBlogPost />} />
      <Route path="/blog/editorial-coffee" element={<EditorialCoffeeBlogPost />} />
      <Route path="/blog/prishtina-poolside" element={<PrishtinaPoolsideBlogPost />} />
      <Route path="/blog/green-coast" element={<GreenCoastBlogPost />} />
      <Route path="/blog/green-coast-visual" element={<GreenCoastVisualBlogPost />} />
      <Route path="/blog/color-psychology" element={<ColorPsychologyBlogPost />} />
      <Route path="/blog/monaco-grand-prix-fashion" element={<MonacoGrandPrixFashionBlogPost />} />
      <Route path="/blog/monaco-immersive" element={<MonacoImmersiveExperience />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  );
}
