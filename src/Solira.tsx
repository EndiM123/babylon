import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Solira.css';
import SoliraSlideshow from './SoliraSlideshow';
import supabase from './supabaseClient';
import Footer from './Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  limited: boolean;
}

// Example fallback data in case of API failure
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Solara Maxi Dress',
    price: 249,
    description: 'Elegant maxi dress for summer',
    category: 'Dresses',
    image: '/sol1.png',
    limited: false,
  },
  {
    id: 2,
    name: 'Aurelia Linen Set',
    price: 349,
    description: 'Comfortable linen set for warm days',
    category: 'Sets',
    image: '/sol2.png',
    limited: false,
  }
];

const SOLIRA_MOMENTS = [
  '/solira1.png',
  '/solira2.png',
  '/solira3.png',
  '/solira4.png',
];

export default function Solira() {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('solira_products')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Showing sample data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Preload images for smooth experience
  useEffect(() => {
    if (products && products.length > 0) {
      products.forEach(product => {
        if (product.image) {
          const img = new window.Image();
          img.src = product.image;
        }
      });
    }
    SOLIRA_MOMENTS.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, [products]);

  // For horizontal scroll snap
  const momentsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="solira-root">
      {/* Fullscreen Landing Slideshow */}
      <SoliraSlideshow />

      {/* Solira Title */}
      <div className="solira-page-title">Solira</div>
<div className="solira-collection-description">Effortless summer elegance inspired by the Mediterranean.</div>

      {loading && <div className="loading">Loading products...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {/* Product Gallery */}
      <section className="solira-gallery">
        {products.map((product, idx) => (
          <Link 
            to={`/solira/product/${product.id}`}
            className={`solira-product-card${product.limited ? ' limited' : ''}`}
            key={product.id}
            style={{
              animationDelay: `${idx * 100}ms`,
              textDecoration: 'none',
              color: 'inherit',
              display: 'block'
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
          </Link>
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
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
