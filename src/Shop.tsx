import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import './App.css';


const CATEGORIES = ['Dresses', 'Outerwear', 'Tops', 'Bottoms', 'Swimwear', 'Accessories'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Sculpted Linen Dress',
    category: 'Dresses',
    image: '/media1.png',
    tag: 'New',
    price: 420,
  },
  {
    id: 2,
    name: 'Curved Edge Blazer',
    category: 'Outerwear',
    image: '/media2.png',
    tag: 'Limited',
    price: 690,
  },
  {
    id: 3,
    name: 'Minimalist Silk Top',
    category: 'Tops',
    image: '/media3.png',
    tag: '',
    price: 240,
  },
  {
    id: 4,
    name: 'Soft Trapeze Skirt',
    category: 'Bottoms',
    image: '/media4.png',
    tag: 'Sold Out',
    price: 310,
  },
  {
    id: 5,
    name: 'Tiffany Bikini',
    category: 'Swimwear',
    image: '/media5.png',
    tag: '',
    price: 195,
  },
  {
    id: 6,
    name: 'Linen Mini Bag',
    category: 'Accessories',
    image: '/media6.png',
    tag: 'New',
    price: 160,
  },
];

export default function Shop() {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const [dropdownPlacement, setDropdownPlacement] = useState<'left' | 'bottom'>('left');
  const [searchText, setSearchText] = useState<string>('');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const filterIconRef = React.useRef<HTMLButtonElement>(null);
  const filterDropdownRef = React.useRef<HTMLDivElement>(null);


  React.useEffect(() => {
    function handleResize() {
      if (filterIconRef.current) {
        const rect = filterIconRef.current.getBoundingClientRect();
        const minLeft = 340;
        if (rect.left < minLeft || window.innerWidth < 700) {
          setDropdownPlacement('bottom');
        } else {
          setDropdownPlacement('left');
        }
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            {/* Search Bar on the left */}
            <div className="shop-side-search" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              {/* Mobile: Only icon initially, show input on click */}
              <button
                className="shop-search-icon-btn"
                aria-label="Open search"
                style={{
                  display: showSearchBar ? 'none' : 'flex',
                  background: 'none',
                  border: 'none',
                  padding: '0.25em 0.45em 0.25em 0',
                  cursor: 'pointer',
                  alignItems: 'center',
                  marginRight: 10,
                }}
                onClick={() => {
                  setShowSearchBar(true);
                  setTimeout(() => searchInputRef.current?.focus(), 80);
                }}
              >
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#A9DDD6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
              {/* Show input if open (mobile), always show on desktop */}
              <input
                ref={searchInputRef}
                type="text"
                className="shop-search-input"
                placeholder="Search products..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: 260,
                  padding: '0.55em 1em',
                  borderRadius: 16,
                  border: '1.5px solid #A9DDD6',
                  fontSize: '1.01em',
                  outline: 'none',
                  background: '#fff',
                  color: '#232323',
                  marginRight: 12,
                  boxSizing: 'border-box',
                  transition: 'border-color 0.18s',
                  display: showSearchBar ? 'block' : 'none',
                }}
                aria-label="Search products"
                onBlur={() => { if (window.innerWidth <= 700) setShowSearchBar(false); }}
              />
            </div>
            {/* Babylon Logo Centered */}
            <span className="shop-side-logo">BABYLON</span>
            {/* Filter Icon on the right */}
            <div className="shop-side-filters" style={{ position: 'relative', marginLeft: 12 }}>
              <button
                className="shop-side-filter-icon"
                aria-label="filters"
                ref={filterIconRef}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                onClick={() => {
                  if (filterIconRef.current) {
                    const rect = filterIconRef.current.getBoundingClientRect();
                    const minLeft = 340; // px, matches max-width + offset
                    if (rect.left < minLeft || window.innerWidth < 700) {
                      setDropdownPlacement('bottom');
                    } else {
                      setDropdownPlacement('left');
                    }
                  }
                  setShowFilterDropdown(v => !v);
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="8" width="18" height="2" rx="1" fill="#888" />
                  <rect x="5" y="18" width="18" height="2" rx="1" fill="#888" />
                  <circle cx="9" cy="9" r="2" fill="#888" />
                  <circle cx="19" cy="19" r="2" fill="#888" />
                </svg>
              </button>
              {showFilterDropdown && (
                <div
                  ref={filterDropdownRef}
                  className={`shop-filter-dropdown-popover${dropdownPlacement === 'bottom' ? ' shop-filter-dropdown-popover--bottom' : ''}`}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="shop-filter-dropdown-section">
                    <div className="shop-filter-dropdown-label">Category</div>
                    <ul className="shop-filter-dropdown-options" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                      {CATEGORIES.map(cat => (
                        <li key={cat}>
                          <button
                            className={`shop-filter-dropdown-pill${selectedCategory === cat ? ' selected' : ''}`}
                            style={{ width: '100%', textAlign: 'left' }}
                            onClick={() => { setSelectedCategory(cat); setShowFilterDropdown(false); }}
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
            {/* Product Grid */}
          <div className="shop-product-grid">
            {PRODUCTS.filter(product => {
              const search = searchText.trim().toLowerCase();
              return (
                (!search ||
                  product.name.toLowerCase().includes(search) ||
                  product.category.toLowerCase().includes(search)) &&
                (!selectedCategory || product.category === selectedCategory)
              );
            }).map(product => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
