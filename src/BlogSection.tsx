import React from 'react';
import './BlogSection.css';
import { Link } from 'react-router-dom';

// Example blog data (replace with real data/fetch in production)
const BLOGS = [
  {
    id: 1,
    image: '/news1.png',
    category: 'Editorial',
    title: 'The Art of Linen: A Modern Renaissance',
    subtitle: 'Exploring the timeless elegance of linen in contemporary fashion.',
    date: 'April 18, 2025',
  },
  {
    id: 2,
    image: '/news2.png',
    category: 'Journal',
    title: 'Behind the Collection: Minimalist Muse',
    subtitle: 'A designer’s journey in crafting understated luxury.',
    date: 'March 29, 2025',
  },
  {
    id: 3,
    image: '/news3.png',
    category: 'Editorial',
    title: 'Color Stories: Mountbatten Pink',
    subtitle: 'How a single hue became this season’s signature accent.',
    date: 'March 10, 2025',
  },
  {
    id: 4,
    image: '/news4.png',
    category: 'Interview',
    title: 'In Conversation with Luca',
    subtitle: 'Insights from a leading voice in modern fashion.',
    date: 'February 22, 2025',
  },
  {
    id: 5,
    image: '/news5.png',
    category: 'Journal',
    title: 'Travel & Texture: Inspirations Abroad',
    subtitle: 'How global journeys shape our editorial vision.',
    date: 'February 2, 2025',
  },
];

export default function BlogSection() {
  return (
    <section className="blog-section">
      <div className="blog-section-inner">
        <h2 className="blog-section-title">Blog & Journal</h2>
        <div className="blog-masonry">
          {BLOGS.map(blog => (
            <Link to={`/blog/${blog.id}`} className="blog-card" key={blog.id}>
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
