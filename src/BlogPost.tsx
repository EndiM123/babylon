import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogSection.css';

// Example blog data (should be replaced with real fetch in production)
const BLOGS = [
  {
    id: 1,
    image: '/news1.png',
    category: 'Editorial',
    title: 'The Art of Linen: A Modern Renaissance',
    subtitle: 'Exploring the timeless elegance of linen in contemporary fashion.',
    date: 'April 18, 2025',
    content: 'Full article content for blog 1...'
  },
  {
    id: 2,
    image: '/news2.png',
    category: 'Journal',
    title: 'Behind the Collection: Minimalist Muse',
    subtitle: 'A designer’s journey in crafting understated luxury.',
    date: 'March 29, 2025',
    content: 'Full article content for blog 2...'
  },
  {
    id: 3,
    image: '/news3.png',
    category: 'Editorial',
    title: 'Color Stories: Mountbatten Pink',
    subtitle: 'How a single hue became this season’s signature accent.',
    date: 'March 10, 2025',
    content: 'Full article content for blog 3...'
  },
  {
    id: 4,
    image: '/news4.png',
    category: 'Interview',
    title: 'In Conversation with Luca',
    subtitle: 'Insights from a leading voice in modern fashion.',
    date: 'February 22, 2025',
    content: 'Full article content for blog 4...'
  },
  {
    id: 5,
    image: '/news5.png',
    category: 'Journal',
    title: 'Travel & Texture: Inspirations Abroad',
    subtitle: 'How global journeys shape our editorial vision.',
    date: 'February 2, 2025',
    content: 'Full article content for blog 5...'
  },
];

export default function BlogPost() {
  const { id } = useParams();
  const blog = BLOGS.find(b => b.id === Number(id));
  if (!blog) return <div className="blog-post-not-found">Blog not found.</div>;
  return (
    <section className="blog-post-section">
      <nav className="blog-breadcrumbs">
        <Link to="/" className="blog-breadcrumb">Home</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <span className="blog-breadcrumb-current">{blog.title}</span>
      </nav>
      <div className="blog-post-hero">
        <img src={blog.image} alt={blog.title} className="blog-post-image" />
        <div className="blog-post-meta">
          <span className="blog-post-category">{blog.category}</span>
          <h1 className="blog-post-title">{blog.title}</h1>
          <div className="blog-post-subtitle">{blog.subtitle}</div>
          <div className="blog-post-date">{blog.date}</div>
        </div>
      </div>
      <article className="blog-post-content">
        {blog.content}
      </article>
    </section>
  );
}
