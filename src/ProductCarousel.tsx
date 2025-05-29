import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCarousel.css';

const PRODUCTS = [
  {
    name: 'Dresses',
    image: '/dress.png', // Replace with your actual image
  },
  {
    name: 'Accessories',
    image: '/acc.png',
  },
  {
    name: 'Bags',
    image: '/bag.png',
  },
  {
    name: 'Bikinis',
    image: '/pamukale.png',
  },
];

export default function ProductCarousel() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [motion, setMotion] = useState(false);

  const displayedIdx = hovered !== null ? hovered : active;

  // When hovered changes, trigger motion effect
  useEffect(() => {
    if (hovered !== null) {
      setMotion(true);
      const timeout = setTimeout(() => setMotion(false), 180);
      return () => clearTimeout(timeout);
    } else {
      setMotion(false);
    }
  }, [hovered]);

  return (
    <section className="product-carousel-section">
      <div className="carousel-container-fullwidth">
        <div className="carousel-frame-fullwidth">
          <div className="carousel-gradient-fullwidth" />
          <div
            className={`carousel-bg-image-fullwidth${motion ? ' carousel-bg-image-hovered' : ''}`}
            style={{ backgroundImage: `url(${PRODUCTS[displayedIdx].image})` }}
          >
            <div className="carousel-product-names-overlay">
              {PRODUCTS.map((product, idx) => (
  <span
    key={product.name}
    className={`carousel-product-name-overlay${displayedIdx === idx ? ' active' : ''}`}
    onClick={() => {
      if (product.name === 'Dresses') {
        navigate('/shop?category=Dresses');
      } else if (product.name === 'Accessories') {
        navigate('/shop?category=Accessories');
      } else if (product.name === 'Bags') {
        navigate('/shop?category=Bags');
      } else if (product.name === 'Bikinis') {
        navigate('/shop?category=Swimwear');
      } else {
        setActive(idx);
      }
    }}
    onMouseEnter={() => setHovered(idx)}
    onMouseLeave={() => setHovered(null)}
    tabIndex={0}
    role="button"
    aria-label={`Show ${product.name}`}
  >
    {product.name}
  </span>
))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
