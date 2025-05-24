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
  {
    id: 6,
    image: '/prishtina-rooftop-hero.jpg',
    category: 'Feature',
    title: 'Skyline Statements: How Prishtina’s Rooftop Nightlife is Rewriting Summer Fashion',
    subtitle: 'A look at how exclusive rooftops like Nova, 13 Rooftop, and Noya are shaping the city’s fashion identity.',
    date: 'May 23, 2025',
    content: '', // Content will be rendered by the immersive layout
  },
];

export default function BlogPost() {
  const { id } = useParams();
  const blog = BLOGS.find(b => b.id === Number(id));
  if (!blog) return <div className="blog-post-not-found">Blog not found.</div>;

  // Custom immersive layout for 'Skyline Statements: Prishtina’s Rooftop Nightlife' (id: 6)
  if (blog.id === 6) {
    return (
      <section className="blog-post-section rooftop-immersive-blog-post">
        <nav className="blog-breadcrumbs">
          <Link to="/" className="blog-breadcrumb">Home</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <span className="blog-breadcrumb-current">{blog.title}</span>
        </nav>
        {/* Parallax/Full-width Hero Image */}
        <div className="rooftop-hero-wrap">
          <div className="rooftop-hero-image-bg">
            <img src={blog.image} alt={blog.title} className="rooftop-hero-image" />
            <div className="rooftop-hero-overlay" />
          </div>
          <div className="rooftop-hero-meta">
            <h1 className="rooftop-hero-title">{blog.title}</h1>
            <div className="rooftop-hero-subtitle">{blog.subtitle}</div>
            <div className="rooftop-hero-date">{blog.date}</div>
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
              <img src="/rooftop-silhouettes.jpg" alt="Golden hour rooftop silhouettes" className="rooftop-block-image left" />
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
              <img src="/rooftop-fashion-closeup.jpg" alt="Fashion closeup on rooftop" className="rooftop-block-image right" />
            </div>
            <div className="rooftop-block rooftop-block-img-text">
              <img src="/noya-rooftop-group.jpg" alt="Noya Rooftop group scene" className="rooftop-block-image left" />
              <div className="rooftop-block-text">
                <blockquote className="rooftop-quote">“On Prishtina’s rooftops, every night is a runway. Style is about confidence, community, and the thrill of being seen.”</blockquote>
              </div>
            </div>
          </div>
        </article>
      </section>
    );
  }

  // Custom immersive layout for 'Travel & Texture: Inspirations Abroad' (id: 5)
  if (blog.id === 5) {
    return (
      <section className="blog-post-section immersive-blog-post">
        <nav className="blog-breadcrumbs">
          <Link to="/" className="blog-breadcrumb">Home</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <span className="blog-breadcrumb-current">{blog.title}</span>
        </nav>
        {/* Immersive full-width hero image with overlays/textures */}
        <div className="immersive-hero-wrap">
          <img src={blog.image} alt={blog.title} className="immersive-hero-image" />
          <div className="immersive-hero-overlay" />
          <div className="immersive-hero-meta">
            <span className="immersive-hero-category">{blog.category}</span>
            <h1 className="immersive-hero-title">{blog.title}</h1>
            <div className="immersive-hero-date">{blog.date}</div>
          </div>
        </div>
        <article className="immersive-blog-content">
          <div className="immersive-intro">
            Wanderlust meets tactile beauty. Our journeys abroad are not just about destinations, but about the textures, colors, and stories we collect along the way. In this editorial, we unravel how global adventures inspire the fabrics, palettes, and spirit of our latest collection. Let yourself be transported.
          </div>
          <div className="immersive-divider" />
          <div className="immersive-article-body">
            <p><strong>From the sun-bleached stones of the Mediterranean to the bustling markets of Marrakech,</strong> every journey leaves an imprint. The interplay of light and shadow on ancient walls, the intricate weave of artisanal baskets, and the unexpected harmony of colors found in distant landscapes—all become part of our creative tapestry.</p>
            <p>Texture is more than a tactile sensation; it’s a memory. In our latest collection, linen echoes the breezy afternoons spent by the sea, while soft cottons recall the comfort of a well-worn travel journal. Subtle embroidery and hand-finished details pay homage to the craftsmanship discovered in hidden ateliers abroad.</p>
            <blockquote className="immersive-quote">“To travel is to collect textures—each one a story, a feeling, a vision for what could be.”</blockquote>
            <p>We invite you to explore this editorial journey—where every fabric, every hue, and every silhouette is an invitation to wander, discover, and feel. Let your wardrobe tell a story of travel and texture, wherever you may roam.</p>
          </div>
        </article>
      </section>
    );
  }

  // Default layout for other blogs
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
