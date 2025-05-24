import React from 'react';
import './BlogSection.css';
import { Link } from 'react-router-dom';

import Footer from './Footer';

export default function RooftopBlogPost() {
  return (
    <>
      <section className="blog-post-section rooftop-immersive-blog-post">
      <nav className="blog-breadcrumbs">
        <Link to="/" className="blog-breadcrumb">Home</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <span className="blog-breadcrumb-current">Skyline Statements: How Prishtina’s Rooftop Nightlife is Rewriting Summer Fashion</span>
      </nav>
      {/* Parallax/Full-width Hero Image */}
      {/* Mobile-only blog title at top */}
      <div className="mobile-hero-title-wrap" style={{marginTop: '1.6em', marginBottom: '0.2em', textAlign: 'center', display: 'none'}}>
        <h1 className="rooftop-hero-title mobile-hero-title" style={{margin: 0}}>
          Skyline Statements: How Prishtina’s Rooftop Nightlife is Rewriting Summer Fashion
        </h1>
        <div className="rooftop-hero-date" style={{marginTop: '1.5em'}}>
          May 23, 2025
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.5em', marginBottom: '1em'}}>
        <div className="rooftop-hero-subtitle">A look at how exclusive rooftops like Nova, 13 Rooftop, and Noya are shaping the city’s fashion identity.</div>
        <div className="rooftop-hero-date">May 23, 2025</div>
      </div>
      <div className="rooftop-hero-wrap">
        <div className="rooftop-hero-image-bg">
          <img src="/rooftop1.png" alt="Prishtina Rooftop Skyline" className="rooftop-hero-image" />
          <div className="rooftop-hero-overlay" />
        </div>
        <div className="rooftop-hero-meta">
          <h1 className="rooftop-hero-title">Skyline Statements: How Prishtina’s Rooftop Nightlife is Rewriting Summer Fashion</h1>
        </div>
      </div>
      <article className="rooftop-blog-content">
        <div className="rooftop-intro">
          As the rooftops of Prishtina open for the summer season, a new style code emerges — glamorous, effortless, and unapologetically boujee. Here's how the city's elevated nightlife is dictating what to wear when the sun goes down.
        </div>
        <div className="rooftop-divider" />
        {/* Alternating image and text blocks */}
        <div className="rooftop-blocks">
          <div className="rooftop-block rooftop-block-img-text">
            <img src="/rooftop2.png" alt="Golden hour rooftop silhouettes" className="rooftop-block-image left" />
            <div className="rooftop-block-text">
              <h2>Golden Hour Glamour</h2>
              <p>As the sun dips behind Prishtina’s skyline, the city’s most exclusive rooftops come alive. Young women gather in flowing satin dresses, gold hoops glinting, sunglasses on even as dusk falls. The mood is boujee, bold, and unmistakably modern.</p>
              <div className="rooftop-trend-box">Satin Slip Dresses</div>
            </div>
          </div>
          <div className="rooftop-block rooftop-block-text-img">
            <div className="rooftop-block-text">
              <h2>Signature Sips & Style</h2>
              <p>At Nova and 13 Rooftop, espresso martinis and curated playlists set the tone. Fashion is a language: strappy heels, statement bags, and tailored blazers are the night’s vocabulary. Every detail is intentional, every look a statement.</p>
              <div className="rooftop-trend-box">Gold Hoops & Espresso Martinis</div>
            </div>
            <img src="/rooftop3.png" alt="Fashion closeup on rooftop" className="rooftop-block-image right" />
          </div>
          <div className="rooftop-block rooftop-block-img-text">
  <div className="rooftop-block-text">
    <blockquote className="rooftop-quote">“On Prishtina’s rooftops, every night is a runway. Style is about confidence, community, and the thrill of being seen.”</blockquote>
  </div>
  <img src="/rooftop1.png" alt="Noya Rooftop group scene" className="rooftop-block-image left" />
</div>
        </div>
      </article>
    </section>
    <Footer />
    </>
  );
}
