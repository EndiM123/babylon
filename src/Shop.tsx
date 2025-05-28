import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import './App.css';
import { supabase } from './lib/supabase';

const PRODUCTS_PER_PAGE = 3; // Number of products to show per page

// Local product metadata that won't change frequently
const PRODUCT_METADATA = {
  1: {
    category: 'Dresses',
    image: '/media1.png',
    tag: 'New',
    description: 'A modern linen dress with sculpted lines and editorial silhouette.'
  },
  2: {
    category: 'Outerwear',
    image: '/media2.png',
    tag: 'Limited',
    description: 'A luxury blazer with a curved-edge design, crafted from premium wool blend.'
  },
  3: {
    category: 'Tops',
    image: '/media3.png',
    tag: '',
    description: 'A sleek, minimalist silk top perfect for layering or wearing solo.'
  },
  4: {
    category: 'Bottoms',
    image: '/media4.png',
    tag: 'Sold Out',
    description: 'A soft, flowing trapeze skirt with a flattering silhouette.'
  },
  5: {
    category: 'Swimwear',
    image: '/media5.png',
    tag: '',
    description: 'A stylish bikini set in a signature Tiffany blue.'
  },
  6: {
    category: 'Accessories',
    image: '/media6.png',
    tag: 'New',
    description: 'A compact linen mini bag, perfect for summer outings and essentials.'
  }
};

// Define product interface combining Supabase data and local metadata
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  tag: string;
  description?: string;
}



export default function Shop() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // On mount, fetch products
  useEffect(() => {
    // Fetch products from Supabase
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price, image');
          
        if (error) {
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log('No products returned from Supabase');
          setProducts([]);
          return;
        }
        
        // Process products from Supabase
        const processedProducts = data.map((product: any) => {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            // Use image from Supabase with fallback
            image: product.image || '/media1.png',
            // Empty defaults for compatibility
            tag: '',
            description: '',
            category: ''
          };
        });
        
        setProducts(processedProducts);
        console.log(`Loaded ${processedProducts.length} products from Supabase`);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Calculate pagination
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  
  // Get current products
  const currentProducts = (() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  })();
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // No search or filter state needed

  return (
    <div className="shop-video-frame">
      <video
        className="word-transition-video"
        src="/endi.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        onContextMenu={e => e.preventDefault()}
      />
      <div className="shop-page">
        {/* Babylon Header (copied from App) */}
        <header className="babylon-header">
          <div className="babylon-header-inner">
            <div className="babylon-header-logo-space"></div>
            <nav className="babylon-nav">
              <Link to="/" className="babylon-nav-item">HOME</Link>
              <Link to="/shop" className="babylon-nav-item">SHOP</Link>
              <Link to="/about" className="babylon-nav-item">ABOUT</Link>
              <Link to="/blog" className="babylon-nav-item">BLOG</Link>
              <Link to="/cart" className="babylon-nav-item">CART</Link>
            </nav>
          </div>
        </header>
        {/* Unified Container for Filter/Sort Bar and Product Grid */}
        <div className="shop-main-container">
          <div className="shop-side-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', gap: '0.5em' }}>
            {/* Simple header with logo */}
            <div className="shop-side-search" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              {/* Empty space for layout balance */}
              <div style={{ width: 40 }}></div>
            </div>
            {/* Babylon Logo Centered */}
            <span className="shop-side-logo">BABYLON</span>
            {/* Empty space on the right for layout balance */}
            <div className="shop-side-filters" style={{ position: 'relative', marginLeft: 12, width: 40 }}>
              {/* No filter button */}
            </div>
          </div>
            {/* Product Grid */}
          {loading ? (
            <div className="shop-loading">
              <div className="shop-loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className="shop-error">
              <p>Error loading products: {error}</p>
              <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
          ) : (
            <div className="shop-product-grid">
              {currentProducts.length === 0 ? (
                <div className="shop-no-products">
                  <p>No products available at the moment.</p>
                </div>
              ) : (
                currentProducts.map((product: Product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="shop-product-card-link">
                <div className="shop-product-card">
                  <span className="shop-product-price shop-product-price-corner" style={{ position: 'absolute', top: 8, right: 8, padding: '4px 12px', zIndex: 12 }}>${product.price}</span>
                  {product.tag && (
                    <span className="shop-product-tag shop-product-tag-corner" style={{ position: 'absolute', top: 8, left: 8, padding: '4px 12px', borderRadius: '1em', background: '#A9DDD6', color: '#1E3932', fontWeight: 700, fontSize: 13, letterSpacing: '0.03em', zIndex: 12 }}>{product.tag}</span>
                  )}
                  <div className="shop-product-content">
                    <div className="shop-product-img-wrap">
                      <img src={product.image} alt={product.name} className="shop-product-img" />
                    </div>
                    <div className="shop-product-gradient" >
                      <div className="shop-product-gradient-bg"></div>
                      <div className="shop-product-row" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '0.5em' }}>
                        <span className="shop-product-name" style={{ fontFamily: 'Wolmer, serif' }}>{product.name}</span>
                      </div>
                      <span className="shop-product-cat" style={{ fontFamily: 'Wolmer, serif', fontSize: 15 }}>{product.category}</span>
                    </div>
                    <span className="shop-product-view">→</span>
                  </div>
                </div>
              </Link>
            )))}
            </div>
          )}
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="shop-pagination" style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '2rem',
              marginBottom: '3rem',
              gap: '0.5rem'
            }}>
              <button 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #A9DDD6',
                  background: 'transparent',
                  color: currentPage === 1 ? '#888' : '#333',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                  margin: '0 0.25rem'
                }}
              >
                &laquo;
              </button>
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #A9DDD6',
                  background: 'transparent',
                  color: currentPage === 1 ? '#888' : '#333',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                  margin: '0 0.25rem'
                }}
              >
                &lsaquo;
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #A9DDD6',
                      background: currentPage === pageNum ? '#A9DDD6' : 'transparent',
                      color: currentPage === pageNum ? '#1E3932' : '#333',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      margin: '0 0.25rem',
                      fontWeight: currentPage === pageNum ? 'bold' : 'normal'
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #A9DDD6',
                  background: 'transparent',
                  color: currentPage === totalPages ? '#888' : '#333',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                  margin: '0 0.25rem'
                }}
              >
                &rsaquo;
              </button>
              <button 
                onClick={() => handlePageChange(totalPages)} 
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #A9DDD6',
                  background: 'transparent',
                  color: currentPage === totalPages ? '#888' : '#333',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                  margin: '0 0.25rem'
                }}
              >
                &raquo;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
