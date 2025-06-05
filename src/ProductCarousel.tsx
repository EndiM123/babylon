import React, { useState, useEffect, useCallback } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Check if device is mobile on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Auto-rotate categories on mobile
  useEffect(() => {
    if (!isMobile || isPaused) return;
    
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % PRODUCTS.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isMobile, isPaused]);
  
  // Pause auto-rotation when user interacts
  const handleInteraction = useCallback((index: number) => {
    if (isMobile) {
      setIsPaused(true);
      setActive(index);
      // Resume after 10 seconds of inactivity
      const timeout = setTimeout(() => setIsPaused(false), 10000);
      return () => clearTimeout(timeout);
    }
  }, [isMobile]);

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
                    handleInteraction(idx);
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
                  onTouchStart={() => handleInteraction(idx)}
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
