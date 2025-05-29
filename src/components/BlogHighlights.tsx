import React from 'react';
import { Link } from 'react-router-dom';
import './BlogHighlights.css';

const BlogHighlights = () => {
  return (
    <section className="blog-highlights">
      <div className="blog-highlights-header">
        <h2 className="blog-highlights-title">Latest Stories</h2>
        <Link to="/blog" className="see-all-button">See All</Link>
      </div>
      <div className="blog-highlights-container">
        {/* Green Coast Visual Blog */}
        <Link to="/blog/green-coast-visual" className="blog-highlight-card">
          <div className="blog-highlight-image" style={{ backgroundImage: 'url(/green.png)' }} />
          <div className="blog-highlight-content">
            <h3>Escape to Green Coast</h3>
            <p>What to Wear, What to Feel, What to Remember</p>
          </div>
        </Link>
        
        {/* Monaco 2025 Blog */}
        <Link to="/blog/monaco-immersive" className="blog-highlight-card">
          <div className="blog-highlight-image" style={{ backgroundImage: 'url(/formula.png)' }} />
          <div className="blog-highlight-content">
            <h3>MONACO 2025: Acceleration, Dressed</h3>
            <p>An immersive journey through fashion, speed, and presence</p>
          </div>
        </Link>

        {/* Espresso & Elegance Blog - Hidden on mobile, shown on desktop */}
        <Link to="/blog/editorial-coffee" className="blog-highlight-card desktop-only">
          <div className="blog-highlight-image" style={{ backgroundImage: 'url(/kafe.png)' }} />
          <div className="blog-highlight-content">
            <h3>Espresso & Elegance</h3>
            <p>Kosovo's Coffee Ritual as Performance Art</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default BlogHighlights;
