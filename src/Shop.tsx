import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Shop.css';
import './App.css';
import { supabase } from './lib/supabase';
import Footer from './Footer';

const INITIAL_PRODUCTS_COUNT = 6; // Number of products to show on first page
const PRODUCTS_PER_PAGE = 3; // Number of products to show on subsequent pages

// Default product image if none is provided
const DEFAULT_PRODUCT_IMAGE = '/media1.png';

// Define product interface combining Supabase data and local metadata
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}



export default function Shop() {
  // Get query parameters from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Category state
  const [categories, setCategories] = useState<string[]>(['All']);
  const [showCategoryMenu, setShowCategoryMenu] = useState<boolean>(false);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  
  // Mobile detection state
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  
  // Update mobile detection on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Focus search input when search modal opens
  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);
  
  // Close category menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setShowCategoryMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Products state
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Apply search to products
  const applySearch = React.useCallback((products: Product[], query: string) => {
    if (!query.trim()) return products;
    
    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) || 
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }, []);

  // Apply category and search filters when products, search query, or category param changes
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Apply category filter if specified in URL
    if (categoryParam) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(categoryParam.toLowerCase())
      );
    }
    
    // Apply search filter if there's a search query
    if (searchQuery.trim()) {
      filtered = applySearch(filtered, searchQuery);
    }
    
    // Update filtered products and reset to first page
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, allProducts, applySearch, categoryParam]);

  // On mount, fetch products and categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('category')
          .not('category', 'is', null);

        if (error) throw error;

        if (data && data.length > 0) {
          // Get unique categories and sort them
          const uniqueCategories = Array.from(
            new Set(data.map((item: any) => item.category).filter(Boolean))
          ).sort() as string[];

          setCategories(['All', ...uniqueCategories]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products with required columns
        const { data, error } = await supabase
          .from('products')
          .select('id, name, description, price, image, category')
          .order('id', { ascending: true });
          
        if (error) {
          throw error;
        }
        
        if (!data || data.length === 0) {
          console.log('No products returned from Supabase');
          setAllProducts([]);
          setFilteredProducts([]);
          return;
        }
        
        // Process products from Supabase
        const processedProducts = data.map((product: any) => {
          // Clean and normalize the category
          const category = (product.category || 'Other').trim();
          
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || DEFAULT_PRODUCT_IMAGE,
            description: product.description || '',
            category: category
          };
        });
        
        // Log all unique categories for debugging
        const uniqueCategories = Array.from(new Set(processedProducts.map(p => p.category)));
        console.log('All product categories:', uniqueCategories);
        
        setAllProducts(processedProducts);
        // Initially show all products
        setFilteredProducts(processedProducts);
        console.log(`Loaded ${processedProducts.length} products from Supabase`);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch both products and categories
    Promise.all([fetchProducts(), fetchCategories()]);
  }, []);
  
  // Calculate pagination
  const getProductsPerPage = (page: number) => {
    return (page === 1 || page === 2) ? 6 : PRODUCTS_PER_PAGE;
  };

  const totalPages = (() => {
    const remaining = filteredProducts.length - 12; // 6 for page 1, 6 for page 2
    if (remaining <= 0) return Math.ceil(filteredProducts.length / 6);
    return 2 + Math.ceil(remaining / PRODUCTS_PER_PAGE);
  })();
  
  // Get current products
  const currentProducts = (() => {
    if (currentPage === 1) {
      return filteredProducts.slice(0, 6);
    } else if (currentPage === 2) {
      return filteredProducts.slice(6, 12);
    } else {
      const startIndex = 12 + (currentPage - 3) * PRODUCTS_PER_PAGE;
      return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
    }
  })();
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Set a flag in sessionStorage to indicate we're on the Shop page
    sessionStorage.setItem('currentPage', 'shop');
    
    // Create a beforeunload handler to ensure we stay on Shop page
    const handleBeforeUnload = () => {
      sessionStorage.setItem('currentPage', 'shop');
      sessionStorage.setItem('scrollPosition', '0');
    };
    
    // Add event listener for page refresh
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Scroll to top on component mount
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    return () => {
      // Clean up event listener
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);



  return (
    <div className="shop-page-container">
      <div className="shop-video-frame">

        <video
          className="shop-video-frame-video"
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
          {/* Unified Container for Search and Product Grid */}
          <div className="shop-main-container">
            <div className="shop-side-controls" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '0 10px' }}>
              {/* Category heading if category filter is applied */}
              {categoryParam && (
                <h2 style={{ 
                  fontFamily: 'Wolmer, serif', 
                  color: '#1E3932', 
                  margin: '20px 0', 
                  textTransform: 'capitalize',
                  textAlign: 'center'
                }}>
                  {categoryParam} Collection
                </h2>
              )}
              
              {/* Category and Search Controls */}
              <div className="shop-controls-container">
                <div className="shop-controls-inner">
                {/* Category Filter Button - positioned at left */}
                <div ref={categoryMenuRef} className="category-button-container">
                  <button 
                    onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                    data-component-name="Shop"
                    style={{
                      background: '#1E3932',
                      color: 'white',
                      border: '1px solid #1E3932',
                      borderRadius: '20px',
                      padding: '6px 12px',
                      fontSize: '13px',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      marginLeft: '0',
                      transform: 'scale(0.9)'
                    }}
                  >
                    <span data-component-name="Shop">Categories</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {/* Category Menu - Different styles for mobile/desktop */}
                  {showCategoryMenu && (
                    isMobile ? (
                      // Mobile: Full screen overlay
                      <div className="category-menu-mobile">
                        <div className="category-menu-mobile-header">
                          <h2 style={{ margin: 0, color: '#1E3932' }}>Categories</h2>
                          <button 
                            onClick={() => setShowCategoryMenu(false)}
                            style={{
                              background: 'none',
                              border: 'none',
                              fontSize: '24px',
                              cursor: 'pointer',
                              color: '#1E3932'
                            }}
                          >
                            ×
                          </button>
                        </div>
                        
                        {categories.map((category) => (
                          <Link 
                            key={category}
                            to={category === 'All' ? '/shop' : `/shop?category=${category}`}
                            style={{
                              display: 'block',
                              padding: '15px 0',
                              fontSize: '18px',
                              color: categoryParam === category || (!categoryParam && category === 'All') ? '#1E3932' : '#333',
                              fontWeight: categoryParam === category || (!categoryParam && category === 'All') ? 'bold' : 'normal',
                              borderBottom: '1px solid #eee',
                              textDecoration: 'none'
                            }}
                            onClick={() => setShowCategoryMenu(false)}
                          >
                            {category}
                            {(categoryParam === category || (!categoryParam && category === 'All')) && (
                              <span style={{ float: 'right', color: '#1E3932' }}>✓</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      // Desktop: Sidebar from left
                      <>
                        {/* Overlay for desktop */}
                        <div 
                          className="category-menu-overlay"
                          onClick={() => setShowCategoryMenu(false)}
                        />
                        
                        {/* Sidebar menu */}
                        <div className="category-menu-desktop">
                          <div className="category-menu-desktop-header">
                            <h2 style={{ margin: 0, color: '#1E3932' }}>Categories</h2>
                            <button 
                              onClick={() => setShowCategoryMenu(false)}
                              style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: '#1E3932'
                              }}
                            >
                              ×
                            </button>
                          </div>
                          
                          {categories.map((category) => (
                            <Link 
                              key={category}
                              to={category === 'All' ? '/shop' : `/shop?category=${category}`}
                              style={{
                                display: 'block',
                                padding: '12px 0',
                                color: categoryParam === category || (!categoryParam && category === 'All') ? '#1E3932' : '#333',
                                fontWeight: categoryParam === category || (!categoryParam && category === 'All') ? 'bold' : 'normal',
                                borderBottom: '1px solid #eee',
                                textDecoration: 'none'
                              }}
                              onClick={() => setShowCategoryMenu(false)}
                            >
                              {category}
                              {(categoryParam === category || (!categoryParam && category === 'All')) && (
                                <span style={{ float: 'right', color: '#1E3932' }}>✓</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </>
                    )
                  )}
                </div>
                
                {/* Babylon Logo Text */}
                <div className="babylon-logo-text">
                  BABYLON
                </div>
                
                {/* Search icon - positioned at right */}
                <div className="shop-side-search" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginLeft: 'auto',
                  position: 'absolute',
                  right: '0',
                  paddingRight: '20px'
                }}>
                  <div className="search-icon-container" onClick={() => setIsSearching(!isSearching)} style={{ cursor: 'pointer' }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: '#1E3932' }}
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              </div>
            </div>
          
          {/* Search modal - visible when search icon is clicked */}
          {isSearching && (
            <div className="search-modal">
              <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="search-modal-header">
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="search-modal-input"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    autoFocus
                  />
                  <button 
                    className="search-modal-close"
                    onClick={() => setIsSearching(false)}
                    aria-label="Close search"
                  >
                    X
                  </button>
                </div>
                {searchQuery.trim() !== '' && (
                  <div className="search-results-count">
                    Found {filteredProducts.length} products
                  </div>
                )}
              </div>
              <div className="search-modal-backdrop" onClick={() => setIsSearching(false)}></div>
            </div>
          )}
          

          
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
      <Footer />
    </div>
  );
}
