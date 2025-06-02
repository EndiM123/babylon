import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Focus search input when search modal opens
  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);
  
  // Close filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterRef]);

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
  const applySearch = (products: Product[]) => {
    if (!searchQuery.trim()) return products;
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Check if device is mobile
  const isMobile = window.innerWidth <= 700;

  // Filter products when category or search query changes
  useEffect(() => {
    console.log('Filtering products...');
    console.log('Selected category:', selectedCategory);
    console.log('All products:', allProducts);
    
    let filtered = [...allProducts];
    
    // Apply category filter if any category is selected
    if (selectedCategory && selectedCategory !== 'All') {
      console.log(`Filtering by category: ${selectedCategory}`);
      filtered = filtered.filter(product => {
        // Trim and normalize whitespace in category names for comparison
        const productCategory = product.category?.trim().toLowerCase() || '';
        const selectedCat = selectedCategory.trim().toLowerCase();
        
        const isMatch = productCategory === selectedCat;
        if (!isMatch) {
          console.log(`Product ${product.name} category '${productCategory}' doesn't match '${selectedCat}'`);
        }
        return isMatch;
      });
      console.log(`Found ${filtered.length} products in category '${selectedCategory}':`, filtered);
    } else {
      console.log('No category filter applied, showing all products');
    }
    
    // Apply search filter if there's a search query
    if (searchQuery.trim()) {
      console.log(`Applying search filter: ${searchQuery}`);
      filtered = applySearch(filtered);
      console.log(`After search '${searchQuery}':`, filtered);
    }
    
    // Log the final filtered products before updating state
    console.log('Final filtered products:', filtered);
    
    // Update filtered products and reset to first page
    setFilteredProducts(filtered);
    setCurrentPage(1);
    
    // Close the filter menu on mobile after selection
    if (isMobile && selectedCategory !== 'All') {
      setIsFilterOpen(false);
    }
  }, [selectedCategory, searchQuery, allProducts, isMobile]);

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
    
    // Fetch both products and categories in parallel
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

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    console.log('Category selected:', category);
    setSelectedCategory(category);
    
    // Reset to first page and close filter menu
    setCurrentPage(1);
    
    // The actual filtering will be handled by the useEffect that watches selectedCategory
    setIsFilterOpen(false);
    
    // Log all unique categories for debugging
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));
    console.log('Available categories in products:', uniqueCategories);
  };

  // Toggle filter dropdown
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="shop-page-container">
      <div className="shop-video-frame">
        {/* Overlay for mobile filter only */}
        {isMobile && (
          <div 
            className={`filter-overlay ${isFilterOpen ? 'visible' : ''}`}
            onClick={() => setIsFilterOpen(false)}
          />
        )}
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
          <div className="shop-side-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '0.5em', padding: '0 10px' }}>
            {/* Left side - Search icon */}
            <div className="shop-side-search" style={{ flex: '0 0 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            
            {/* Babylon Logo Centered */}
            <span className="shop-side-logo" style={{ flex: 1, textAlign: 'center', fontFamily: 'Wolmer, Inter, Arial, sans-serif', color: '#A67899', fontWeight: 900, letterSpacing: '0.16em' }}>BABYLON</span>
            
            {/* Filter button - visible on all screen sizes */}
            <div 
              className="shop-side-filters" 
              ref={filterRef}
              style={{ flex: '0 0 80px', display: 'flex', justifyContent: 'flex-end' }}
            >
              <button 
                className="shop-filter-button" 
                aria-label="Filter products"
                onClick={toggleFilter}
                aria-expanded={isFilterOpen}
                style={{
                  background: '#1E3932',
                  color: 'white',
                  border: '1px solid #1E3932',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <span>Filter</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                  <path d="M4 6H20M8 12H16M11 18H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Desktop-only filter overlay - visible when filter is open */}
          {!isMobile && isFilterOpen && (
            <div 
              className={`filter-overlay ${isFilterOpen ? 'visible' : ''}`}
              onClick={() => setIsFilterOpen(false)}
            ></div>
          )}
          
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
          
          {/* Filter dropdown - different styles for mobile/desktop */}
          {isFilterOpen && (
            <div 
              className={`filter-dropdown ${isFilterOpen ? 'visible' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile header with close button */}
              <div className="filter-header">
                <h3>Filter by Category</h3>
                <button 
                  className="filter-close-button"
                  onClick={() => setIsFilterOpen(false)}
                  aria-label="Close filter"
                >
                  X
                </button>
              </div>
              <div className="filter-options">
                {categories.map(category => (
                  <div 
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`filter-option ${selectedCategory === category ? 'selected' : ''}`}
                  >
                    {category}
                    {selectedCategory === category && (
                      <span className="filter-checkmark">✓</span>
                    )}
                  </div>
                ))}
              </div>
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
