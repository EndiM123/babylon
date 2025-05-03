import React, { useEffect, useRef } from 'react';
import './Solira.css';
import SoliraSlideshow from './SoliraSlideshow';

// Example Solira collection data
const SOLIRA_PRODUCTS = [
  {
    id: 1,
    name: 'Salt Veil Dress',
    image: '/Solira1.jpg',
    price: 540,
    limited: true,
  },
  {
    id: 2,
    name: 'Luminance Top',
    image: '/Solira2.jpg',
    price: 320,
    limited: false,
  },
  {
    id: 3,
    name: 'Sunlit Trench',
    image: '/Solira3.jpg',
    price: 690,
    limited: true,
  },
  {
    id: 4,
    name: 'Mediterranean Skirt',
    image: '/Solira4.jpg',
    price: 410,
    limited: false,
  },
  {
    id: 5,
    name: 'Seafoam Bandeau',
    image: '/Solira5.jpg',
    price: 220,
    limited: false,
  },
  {
    id: 6,
    name: 'Radiant Linen Pants',
    image: '/Solira6.jpg',
    price: 370,
    limited: false,
  },
];

const SOLIRA_MOMENTS = [
  '/solira1.png',
  '/solira2.png',
  '/solira3.png',
  '/solira4.png',
];

export default function Solira() {
  // Preload images and video for smooth experience
  useEffect(() => {
    SOLIRA_PRODUCTS.forEach(p => {
      const img = new window.Image();
      img.src = p.image;
    });
    SOLIRA_MOMENTS.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  // For horizontal scroll snap
  const momentsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="solira-root">
      {/* Fullscreen Landing Slideshow */}
      <SoliraSlideshow />

      {/* Solira Title */}
      <div className="solira-page-title">Solira</div>

      {/* Product Gallery */}
      <section className="solira-gallery">
        {SOLIRA_PRODUCTS.map((product, idx) => (
          <div
            className={`solira-product-card${product.limited ? ' limited' : ''}`}
            key={product.id}
            style={{
              animationDelay: `${idx * 100}ms`,
            }}
          >
            {product.limited && <span className="solira-limited-tag">Limited</span>}
            <div className="solira-product-img-wrap">
              <img
                src={product.image}
                alt={product.name}
                className="solira-product-img"
                style={{ aspectRatio: '4/5', objectFit: 'cover' }}
                draggable={false}
              />
            </div>
            <div className="solira-product-info-row">
              <span className="solira-product-name">{product.name}</span>
              <span className="solira-product-price">${product.price}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Editorial Scroll Section */}
      <section className="solira-moments-section">
        <div className="solira-moments-title">Solira Moments</div>
        <div className="solira-moments-scroll" ref={momentsRef}>
          {SOLIRA_MOMENTS.map((src, idx) => (
            <div className="solira-moment-panel" key={src} style={{ animationDelay: `${idx * 100}ms` }}>
              <img src={src} alt="Solira moment" className="solira-moment-img" draggable={false} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
