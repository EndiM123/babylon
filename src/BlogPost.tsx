import React from 'react';
import { useParams, Link } from 'react-router-dom';
import "./BlogSection.css";
import "./immersive-blog-responsive.css";

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
    id: 7,
    image: '/coffee-culture-hero.jpg',
    category: 'Feature',
    title: 'Espresso & Elegance: How Kosovo’s Coffee Culture Became the New Fashion Runway',
    subtitle: 'A look at how the café ritual became Kosovo’s daily stage for fashion and identity.',
    date: 'May 24, 2025',
    content: '', // Custom immersive layout below
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

  // Custom immersive layout for 'Espresso & Elegance: How Kosovo’s Coffee Culture Became the New Fashion Runway' (id: 7)
  if (blog.id === 7) {
    return (
      <section className="blog-post-section immersive-blog-post">
        <nav className="blog-breadcrumbs">
          <Link to="/" className="blog-breadcrumb">Home</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
          <span className="blog-breadcrumb-sep">/</span>
          <span className="blog-breadcrumb-current">{blog.title}</span>
        </nav>
        {/* Coffee Culture Blog Image */}
        <img src="/kafe1.png" alt="Kosovo coffee culture" className="immersive-hero-image" />
        {/* Immersive full-width hero image with overlays/textures */}
                <article className="immersive-blog-content">
          <div className="immersive-intro">
            Terrazzo café tables shimmer in the late-morning sun. Velvet chairs cradle the city’s early risers and afternoon dreamers alike. In Prishtina, the gentle clink of ceramic cups and the rhythmic click of heels on cobbled streets are more than background—they’re the overture to a daily spectacle. Here, cafés are never just stops. They are showcases. People don’t arrive to disappear into coffee—they arrive to be seen: hair freshly styled, sunglasses chosen with intent, a crisp blazer thrown over a silk set, shoes polished but unbothered. Every entrance is a statement, every table a front row.
          </div>
          <div className="immersive-divider" />
          <div className="immersive-article-body">
            <p><strong>In Kosovo, the coffee break is not a pause—it’s a presence.</strong> Across generations, the ritual of “drinking coffee” is a cornerstone of daily life: from business meetings and best-friend catchups to solo journaling sessions and quick breaks between errands. The act is as much about the aesthetic of arrival as it is about caffeine. A cappuccino becomes a symbol of composure. A macchiato is confidence in a cup. Each café is a micro-stage for personal branding, a place where style is lived, not reserved for special occasions.</p>
            <p>This culture has transformed the city’s fashion DNA. People don’t dress down for a latte—they elevate. The rise of café-ready essentials is unmistakable: oversized sunglasses, minimalist gold jewelry, linen sets, crisp white shirts, cashmere drapes, structured bags, neutral-toned loafers. Our boutique’s edit is inspired by these moments—capsule pieces that transition effortlessly from boardroom to café bar stool. Imagine pleated trousers and a silk tank set, or a soft leather crossbody that balances casual ease with couture precision.</p>
            <blockquote className="immersive-quote">“Style is not reserved for special occasions here—it’s lived daily, espresso in hand.”</blockquote>
            <p><strong>Coffee Moment Vignettes:</strong></p>
            <ul>
              <li><em>Post-work espresso martini:</em> Soft tailoring, kitten heels, and a structured bag—perfect for unwinding in style as dusk settles over the city.</li>
              <li><em>10 a.m. macchiato meeting:</em> Wide-leg trousers, a tucked-in silk tank, and tinted eyewear—effortless polish for sealing deals or sharing dreams.</li>
              <li><em>Sunday cappuccino:</em> A flowing summer dress, platform sandals, and gold earrings catching the sun—relaxed elegance for slow mornings and people-watching.</li>
            </ul>
            <p>Each vignette is a reflection of our boutique’s “Café-Ready Essentials”—pieces curated to move with you, wherever your day (and coffee) takes you.</p>
            <p>In Kosovo, coffee is more than a beverage—it’s identity, rhythm, and reflection. It’s a moment of stillness paired with silent self-expression, a ritual that binds strangers and defines friends. It’s a mirror of how we choose to show up in the world. Here, the city’s most iconic catwalk is the café chair—and style is always in session.</p>
          </div>
          <div className="immersive-divider" />
          <div className="immersive-article-body">
            <p><strong>Ready to embrace the ritual?</strong> Explore our boutique’s “Café-Ready Essentials” edit—curated to complement Kosovo’s vibrant coffee culture and your most stylish moments.</p>
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
