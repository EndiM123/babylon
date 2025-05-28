import React from 'react';
import './BlogSection.css';
import { Link } from 'react-router-dom';

// Example blog data (replace with real data/fetch in production)
const BLOGS = [

  // Green Coast Visual blog card
  {
    id: 'green-coast-visual',
    image: '/green.png',
    category: 'Visual Feature',
    title: "Escape to Green Coast: What to Wear, What to Feel, What to Remember",
    subtitle: "An immersive visual journey through Albania's most luxurious coastal retreat.",
    date: 'May 26, 2025',
    href: '/blog/green-coast-visual',
  },
  // Green Coast Riviera blog card
  
  {
    id: 2,
    image: '/news2.png',
    category: 'Journal',
    title: 'Behind the Collection: Minimalist Muse',
    subtitle: 'A designer’s journey in crafting understated luxury.',
    date: 'March 29, 2025',
  },

  {
    id: 'color-psychology',
    image: '/ngjyra.png',
    category: 'Style Psychology',
    title: 'The Color of Identity: How Your Palette Shapes Your Presence',
    subtitle: 'Discover how the colors we wear silently shape how the world sees us and how we feel in our own skin.',
    date: 'May 26, 2025',
    href: '/blog/color-psychology',
  },
  // Immersive Rooftop Editorial Experience
  {
    id: 'immersive-rooftop',
    image: '/rooftop.png',
    category: 'Editorial Experience',
    title: 'Skyline Statements: How Prishtina’s Rooftop Nightlife is Rewriting Summer Fashion',
    subtitle: 'An immersive journey through golden hour, blue hour, and midnight on the city\'s most exclusive rooftops.',
    date: 'May 27, 2025',
    href: '/blog/immersive-rooftop',
    featured: true
  },
  // Rooftop nightlife blog card
 
  // Luxury Swimwear blog card
  {
    id: 'prishtina-poolside',
    image: 'pool.png',
    category: 'Feature',
    title: 'Where the Water Glimmers: Prishtina’s Poolside Glamour and the Rise of Luxury Swimwear Culture',
    subtitle: 'Inside the city’s most exclusive pools, a new era of summer fashion and aspirational living emerges.',
    date: 'May 24, 2025',
    href: '/blog/prishtina-poolside',
  },
  {
    id: 'editorial-coffee',
    image: '/kafe.png',
    category: 'Editorial Experience',
    title: 'Espresso & Elegance: Kosovo\'s Coffee Ritual as Performance Art',
    subtitle: 'An immersive exploration of how coffee becomes the stage for personal style and identity.',
    date: 'May 24, 2025',
    href: '/blog/editorial-coffee',
    featured: true
  },
];

export default function BlogSection() {
  return (
    <section className="blog-section">
      <div className="blog-section-inner">
        <h2 className="blog-section-title">Blog & Journal</h2>
        <div className="blog-masonry">
          {BLOGS.map(blog => (
            <Link
              to={blog.href ? blog.href : `/blog/${blog.id}`}
              className="blog-card"
              key={blog.id}
            >
              <div className="blog-card-image-wrap">
                <img src={blog.image && blog.image.trim() !== '' ? blog.image : `https://source.unsplash.com/random/800x600?sig=${blog.id}&fashion,editorial`} alt={blog.title} className="blog-card-image" />
              </div>
              <div className="blog-card-meta">
                <span className="blog-card-category">{blog.category}</span>
                <h3 className="blog-card-title">{blog.title}</h3>
                <div className="blog-card-subtitle">{blog.subtitle || blog.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
