import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './immersive-blog-responsive.css';
import './immersive-coffee.css';

// Blog data for this specific page
const blog = {
  id: 7,
  image: '/kafe1.jpg',
  category: 'Feature',
  title: 'Espresso & Elegance: How Kosovo’s Coffee Culture Became the New Fashion Runway',
  subtitle: 'A look at how the café ritual became Kosovo’s daily stage for fashion and identity.',
  date: 'May 24, 2025',
};

export default function CoffeeCultureBlogPost() {
  return (
    <section className="blog-post-section immersive-blog-post">
      <nav className="blog-breadcrumbs">
        <Link to="/" className="blog-breadcrumb">Home</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <span className="blog-breadcrumb-current">{blog.title}</span>
      </nav>
      {/* Hero Image */}
      <div className="immersive-hero-wrap">
        <div className="immersive-hero-image-wrap" style={{position: 'relative', width: '100vw'}}>
  <img src={blog.image} alt={blog.title} className="immersive-hero-image" />
  <h1 className="immersive-hero-title-overlay">{blog.title}</h1>
</div>
      </div>
      <div className="immersive-hero-meta">
        <h1 className="immersive-hero-title">{blog.title}</h1>
        <div className="immersive-hero-subtitle">{blog.subtitle}</div>
        <div className="immersive-hero-date">{blog.date}</div>
      </div>
      <article className="immersive-blog-content">
        <div className="immersive-intro">
          In Kosovo, coffee is more than a drink—it's a ritual, a rhythm, and a runway. Every café becomes a stage, every espresso an opportunity to express identity and style. From the bustling streets of Prishtina to the quiet corners of Gjakova, the culture of coffee is woven into the fabric of daily life and fashion.
        </div>
        <div className="immersive-divider" />
        <div className="immersive-article-body">
          <p>
            The tradition of meeting for coffee, or "me pi kafe," is a cherished social anchor. But in recent years, these gatherings have evolved into spontaneous fashion shows. Young Kosovars, creatives, and professionals alike curate their looks for the café—mixing European trends with local flair.
          </p>
          <p>
            Cafés like Soma, Dit' e Nat', and Half & Half are not just places to sip; they're places to be seen. Outfits are carefully chosen, accessories thoughtfully layered, and every detail—from sunglasses to shoes—tells a story.
          </p>
          <div className="immersive-quote">
            "In Kosovo, your coffee order is as important as your outfit. Both say something about who you are."
          </div>
          <p>
            This intersection of coffee and couture has given rise to a unique visual language. Instagram feeds brim with snapshots of lattes and loafers, cappuccinos and couture. Influencers, designers, and everyday style-setters use the café as a canvas.
          </p>
          <p>
            As the aroma of coffee drifts through the air, so does a sense of possibility. Here, every table is a front row seat and every street a catwalk. Kosovo’s coffee culture is not just about what’s in the cup, but what’s in the scene.
          </p>
        </div>
      </article>
    </section>
  );
}
