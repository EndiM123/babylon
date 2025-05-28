import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './GreenCoastVisual.css';
import './immersive-blog-responsive.css';

// Riviera Capsule collection items
const CAPSULE_ITEMS = [
  {
    id: 1,
    name: 'Linen Two-Piece Set',
    image: '/2linenpiece.png',
    price: '€190',
    category: 'Resortwear'
  },
  {
    id: 2,
    name: 'One-Shoulder Swimsuit',
    image: '/onesided.png',
    price: '€120',
    category: 'Swim'
  },
  {
    id: 3,
    name: 'Silk Scarf',
    image: '/silkscarf.png',
    price: '€85',
    category: 'Accessories'
  },
  {
    id: 4,
    name: 'Gold Vermeil Cuff',
    image: '/vermeil.png',
    price: '€110',
    category: 'Accessories'
  },
  {
    id: 5,
    name: 'Leather Espadrilles',
    image: '/espadrilles.jpg',
    price: '€95',
    category: 'Accessories'
  },
  {
    id: 6,
    name: 'Straw Tote',
    image: '/straw-tote.jpg',
    price: '€130',
    category: 'Accessories'
  },
  {
    id: 7,
    name: 'Cotton Wrap Dress',
    image: '/wrap-dress.jpg',
    price: '€160',
    category: 'Resortwear'
  },
  {
    id: 8,
    name: 'Silk Slip Dress',
    image: '/slip-dress.jpg',
    price: '€175',
    category: 'Evening'
  }
];

// Slideshow images
const SLIDESHOW_IMAGES = [
  {
    src: '/bazen.png',
    alt: 'Green Coast infinity pool at sunset',
    caption: 'The infinity pool at Green Coast Resort blends seamlessly with the Ionian horizon'
  },
  {
    src: '/stili.png',
    alt: 'Linen outfit on terrace with morning espresso',
    caption: 'Morning espresso on the terrace calls for breathable linen and minimal gold accents'
  },
  {
    src: '/palase.png',
    alt: 'Beach at Palasa',
    caption: 'The crystal waters of Palasa Beach, just minutes from the resort'
  },
  {
    src: '/ulli.png',
    alt: 'Evening dinner setting under olive trees',
    caption: 'Sunset dinners under olive trees - the perfect backdrop for our silk slip dress'
  },
  {
    src: '/llogora.png',
    alt: 'Coastal drive view of Llogara Pass',
    caption: 'The winding coastal road to Dhermi reveals new shades of blue at every turn'
  }
];



export default function GreenCoastVisualBlogPost() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [visiblePin, setVisiblePin] = useState<string | null>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);
  const slideshowTimer = useRef<NodeJS.Timeout | null>(null);

  // Slideshow auto-rotation
  useEffect(() => {
    slideshowTimer.current = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 5000);

    return () => {
      if (slideshowTimer.current) {
        clearInterval(slideshowTimer.current);
      }
    };
  }, []);

  // No need for filtering function as we're displaying items directly

  return (
    <div className="visual-blog-container">
      <nav className="blog-breadcrumbs">
        <Link to="/" className="blog-breadcrumb">Home</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <Link to="/blog" className="blog-breadcrumb">Blog & Journal</Link>
        <span className="blog-breadcrumb-sep">/</span>
        <span className="blog-breadcrumb-current">Escape to Green Coast</span>
      </nav>

      {/* Hero Section with Video/Image */}
      <section className="coast-hero-section">
        <img 
          src="/greencoast.png" 
          alt="Green Coast Resort panorama" 
          className="coast-hero-image"
        />
        <div className="coast-hero-overlay">
          <h1 className="coast-hero-title">Escape to Green Coast</h1>
          <h2 className="coast-hero-subtitle">What to Wear, What to Feel, What to Remember</h2>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="/green2.png">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* Poetic Intro Section */}
      <section className="coast-poetic-section">
        <p className="coast-poetic-text">
          The air carries salt and wild fig.<br />
          Whitewashed villas emerge from hillsides like a mirage.<br />
          The Ionian stretches endlessly below.
        </p>
        <img 
          src="/green2.png" 
          alt="Green Coast landscape" 
          style={{
            width: '90%',
            maxWidth: '1200px',
            margin: '2rem auto',
            display: 'block',
            borderRadius: '8px'
          }}
        />
      </section>


      {/* Riviera Capsule Slideshow */}
      <section className="coast-content-section">
        <h2 className="coast-one-liner">The Riviera Capsule</h2>
        <div className="coast-slideshow" ref={slideshowRef}>
          {SLIDESHOW_IMAGES.map((slide, index) => (
            <div 
              key={index} 
              className={`coast-slide ${activeSlide === index ? 'active' : ''}`}
              onClick={() => setActiveSlide((index + 1) % SLIDESHOW_IMAGES.length)}
            >
              <img 
                src={slide.src} 
                alt={slide.alt} 
                className="coast-slide-img" 
              />
              <div className="coast-slide-caption">{slide.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Handwritten Quote */}
      <p className="handwritten-text">
        This isn't just a destination—it's a state of mind.
      </p>

      {/* Shop the Look Section */}
      <section className="coast-content-section">
        <h2 className="coast-one-liner">Essential Pieces</h2>
        <div className="shop-look-container">
          {CAPSULE_ITEMS.slice(0, 4).map(item => (
            <div key={item.id} className="shop-look-item">
              <img 
                src={item.image} 
                alt={item.name} 
                className="shop-look-image" 
              />
              <h3 className="shop-look-title">{item.name}</h3>
              <p className="shop-look-price">{item.price}</p>
              <button className="shop-look-button">Shop Now</button>
            </div>
          ))}
        </div>
      </section>


      {/* Map Section */}
      <section className="coast-map-section">
        <img 
          src="/harta.png" 
          alt="Albanian Riviera Map" 
          className="coast-map-image" 
        />
        <div 
          className="coast-map-pin" 
          style={{ left: '15%', top: '15%' }}
          onMouseEnter={() => setVisiblePin('palasa')}
          onMouseLeave={() => setVisiblePin(null)}
        />
        {visiblePin === 'palasa' && (
          <div 
            className="coast-map-tooltip palasa-above-dhermi"
            style={{ left: '15%', top: '15%', transform: 'translate(30px, 10px)', position: 'absolute' }}
          >
            <h4>Palasa Beach</h4>
            <p>Pristine pebble beach with crystal clear waters, perfect for our One-Shoulder Swimsuit</p>
            <p className="palasa-special-note">Visit during sunset for an unforgettable experience</p>
          </div>
        )}
        <div 
          className="coast-map-pin" 
          style={{ left: '35%', top: '50%' }}
          onMouseEnter={() => setVisiblePin('dhermi')}
          onMouseLeave={() => setVisiblePin(null)}
        >
          {visiblePin === 'dhermi' && (
            <div className="coast-map-tooltip">
              <h4>Dhermi</h4>
              <p>Charming coastal village with seaside tavernas and beautiful beaches</p>
              <p className="palasa-special-note">Perfect for wearing our Linen Two-Piece Set</p>
            </div>
          )}
        </div>
        <div 
          className="coast-map-pin desktop-only-pin" 
          style={{ left: '60%', top: '35%' }}
          onMouseEnter={() => setVisiblePin('viewpoint')}
          onMouseLeave={() => setVisiblePin(null)}
        >
          {visiblePin === 'viewpoint' && (
            <div className="coast-map-tooltip">
              <h4>Dhermi Viewpoint</h4>
              <p>Stunning panoramic views of the coastline and crystal clear waters</p>
              <p className="palasa-special-note">Ideal spot for our Silk Scarf photoshoot</p>
            </div>
          )}
        </div>
        <div 
          className="coast-map-pin desktop-only-pin" 
          style={{ left: '50%', top: '50%' }}
          onMouseEnter={() => setVisiblePin('resort')}
          onMouseLeave={() => setVisiblePin(null)}
        >
          {visiblePin === 'resort' && (
            <div className="coast-map-tooltip">
              <h4>Green Coast Resort</h4>
              <p>Luxury villas and infinity pools overlooking the Ionian Sea</p>
              <p className="palasa-special-note">The perfect backdrop for our Gold Vermeil Cuff</p>
            </div>
          )}
        </div>
        {/* Desktop-only Jale Beach Pin */}
        <div 
          className="coast-map-pin desktop-only-pin" 
          style={{ left: '75%', top: '40%' }}
          onMouseEnter={() => setVisiblePin('jale')}
          onMouseLeave={() => setVisiblePin(null)}
        >
          {visiblePin === 'jale' && (
            <div className="coast-map-tooltip">
              <h4>Jale Beach</h4>
              <p>Secluded cove with turquoise waters, ideal for a quiet swim</p>
              <p className="palasa-special-note">Discover our Gold Vermeil Cuff here</p>
            </div>
          )}
        </div>
        {/* Desktop-only Middle Map Pin */}
        <div 
          className="coast-map-pin desktop-only-pin" 
          style={{ left: '50%', top: '35%' }}
          onMouseEnter={() => setVisiblePin('middle')}
          onMouseLeave={() => setVisiblePin(null)}
        >
          {visiblePin === 'middle' && (
            <div className="coast-map-tooltip">
              <h4>Middle Point</h4>
              <p>A central spot for Riviera adventures</p>
              <p className="palasa-special-note">Perfect for a group photo!</p>
            </div>
          )}
        </div>
      </section>

      {/* One-liner */}
      <p className="coast-one-liner">
        Pack light. Feel everything. Remember always.
      </p>

      {/* Call to Action */}
      <section className="coast-cta-section">
        <h2 className="coast-cta-title">Your Green Coast Begins Here</h2>
        <div className="coast-collection-grid">
          <div className="coast-collection-item" onClick={() => window.location.href = '/shop?category=Resortwear'}>
            <h3 className="coast-collection-title">Resortwear</h3>
            <p>Breathable linens and effortless silhouettes</p>
          </div>
          <div className="coast-collection-item" onClick={() => window.location.href = '/shop?category=Swim'}>
            <h3 className="coast-collection-title">Swim</h3>
            <p>Statement pieces for infinity pools and hidden coves</p>
          </div>
          <div className="coast-collection-item" onClick={() => window.location.href = '/shop?category=Accessories'}>
            <h3 className="coast-collection-title">Accessories</h3>
            <p>The finishing touches that elevate every moment</p>
          </div>
          <div className="coast-collection-item" onClick={() => window.location.href = '/shop?category=Evening'}>
            <h3 className="coast-collection-title">Evening</h3>
            <p>From sunset cocktails to starlit dinners</p>
          </div>
        </div>
      </section>
    </div>
  );
}
