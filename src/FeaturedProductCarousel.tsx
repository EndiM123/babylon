import React, { useRef, useState } from 'react';
import './FeaturedProductCarousel.css';

const FEATURED_PRODUCTS = [
  {
    name: 'Sculpted Linen Dress',
    image: '/featured1.png',
    tag: 'New',
    price: 420,
    discount: null,
    quickAdd: true,
  },
  {
    name: 'Curved Edge Blazer',
    image: '/featured2.png',
    tag: '-30%',
    price: 690,
    discount: 483,
    quickAdd: false,
  },
  {
    name: 'Minimalist Silk Top',
    image: '/featured3.png',
    tag: '',
    price: 240,
    discount: null,
    quickAdd: true,
  },
  {
    name: 'Soft Trapeze Skirt',
    image: '/featured4.png',
    tag: 'New',
    price: 310,
    discount: null,
    quickAdd: false,
  },
  {
    name: 'Stylish SunHat',
    image: '/featured5.png',
    tag: 'Limited',
    price: 70,
    discount: null,
    quickAdd: false,
  },
  // Add more if needed
];

// Optionally, add a category field to each product if you want to display it
// e.g. { name: ..., image: ..., tag: ..., price: ..., discount: ..., quickAdd: ..., category: 'Swimwear' }

export default function FeaturedProductCarousel() {
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    const cardsPerView = getCardsPerView();
    const card = containerRef.current.querySelector('.featured-product-card');
    if (!card) return;
    const cardWidth = card.clientWidth + parseFloat(getComputedStyle(card).marginRight || '0');
    let newIndex = scrollIndex;
    if (dir === 'left') {
      newIndex = Math.max(scrollIndex - 1, 0);
    } else {
      newIndex = Math.min(scrollIndex + 1, FEATURED_PRODUCTS.length - cardsPerView);
    }
    setScrollIndex(newIndex);
    containerRef.current.scrollTo({ left: newIndex * cardWidth, behavior: 'smooth' });
  };


  function getCardsPerView() {
    if (window.innerWidth < 700) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  }

  return (
    <section className="featured-carousel-section">
      <div className="featured-carousel-header-row">
        <h2 className="featured-carousel-title">Featured Products</h2>
        <div className="carousel-arrow-group">
          <button className="carousel-arrow left" aria-label="Scroll left" onClick={() => handleScroll('left')}>&lt;</button>
          <button className="carousel-arrow right" aria-label="Scroll right" onClick={() => handleScroll('right')}>&gt;</button>
        </div>
      </div>
      <div className="featured-carousel-wrapper">
        <div
          className="featured-carousel-container"
          ref={containerRef}
          style={
            window.innerWidth < 700
              ? { scrollSnapType: 'x mandatory', overflowX: 'auto', display: 'flex' }
              : { display: 'flex' }
          }
        >
          {(window.innerWidth < 700
            ? FEATURED_PRODUCTS.slice(scrollIndex, scrollIndex + 1)
            : FEATURED_PRODUCTS.slice(scrollIndex, scrollIndex + 4)
          ).map((product) => (
            <div
              className="featured-product-card"
              key={product.name}
              style={
                window.innerWidth < 700
                  ? { position: 'relative', overflow: 'hidden', scrollSnapAlign: 'start', flex: '0 0 100%' }
                  : { position: 'relative', overflow: 'hidden', flex: '1 0 0%' }
              }
            >
              {product.tag && <span className="product-tag-badge">{product.tag}</span>}
              {window.innerWidth >= 700 && (
                <span className="featured-product-pricing">
                  <span className="new-price">${product.discount ?? product.price}</span>
                </span>
              )}
              <img
                className="featured-product-image"
                src={product.image}
                alt={product.name}
              />
              <div className="featured-product-card-bottom-row">
                <span className="featured-product-name" style={{ color: 'white', fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}>{product.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
