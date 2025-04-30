import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import './App.css';

const NAV_ITEMS = ['HOME', 'SHOP', 'ABOUT', 'BLOG', 'CART'];

const COLORS = {
  mountbattenPink: '#A67899',
  linen: '#F7EFE5',
  tiffanyBlue: '#A9DDD6',
  darkGreen: '#1E3932',
};

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS_FILTER = [
  { name: 'Mountbatten Pink', value: COLORS.mountbattenPink },
  { name: 'Black', value: '#222' },
  { name: 'White', value: '#fff' },
  { name: 'Linen', value: COLORS.linen },
  { name: 'Tiffany Blue', value: COLORS.tiffanyBlue },
  { name: 'Cream', value: '#f7f2e6' },
];
const CATEGORIES = ['Dresses', 'Outerwear', 'Tops', 'Bottoms', 'Swimwear', 'Accessories'];
const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'priceLow' },
  { label: 'Price: High to Low', value: 'priceHigh' },
  { label: 'Most Popular', value: 'popular' },
];

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
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 800]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

  // Filtering logic omitted for brevity

  return (
    <div className="shop-page" style={{ background: COLORS.linen, minHeight: '100vh' }}>
      {/* Babylon Header (same as main page, logo always visible) */}
      <header className="babylon-header">
        <div className="babylon-header-inner">
          <div className="babylon-header-logo-space">
            <span className="babylon-header-logo">BABYLON</span>
          </div>
          <nav className="babylon-nav">
            {NAV_ITEMS.map((item) => (
              item === 'SHOP' ? null : (
                <span key={item} className="babylon-nav-item">
                  {item}
                </span>
              )
            ))}
          </nav>
        </div>
      </header>

      {/* Unified Container for Filter/Sort Bar and Product Grid */}
      <div className="shop-main-container">
        {/* Minimalistic Side Filter/Sort Bar */}
        <div className="shop-side-controls">
          <div className="shop-side-filters" style={{ position: 'relative' }}>
            <button
              className="shop-side-filter-icon"
              aria-label="filters"
              onClick={() => setShowFilterDropdown(v => !v)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="8" width="18" height="2" rx="1" fill="#888"/>
                <rect x="5" y="18" width="18" height="2" rx="1" fill="#888"/>
                <circle cx="9" cy="9" r="2" fill="#888"/>
                <circle cx="19" cy="19" r="2" fill="#888"/>
              </svg>
            </button>
            <span className="shop-side-filter-label">Filters by</span>
            <span className="shop-side-filter-all">All</span>

            {showFilterDropdown && (
              <div className="shop-filter-dropdown-popover" onClick={e => e.stopPropagation()}>
                <div className="shop-filter-dropdown-section">
                  <div className="shop-filter-dropdown-label">Size</div>
                  <div className="shop-filter-dropdown-options">
                    {SIZES.map(size => (
                      <button
                        key={size}
                        className={`shop-filter-dropdown-pill${selectedSize === size ? ' selected' : ''}`}
                        onClick={() => { setSelectedSize(size); setShowFilterDropdown(false); }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="shop-filter-dropdown-section">
                  <div className="shop-filter-dropdown-label">Color</div>
                  <div className="shop-filter-dropdown-options">
                    {COLORS_FILTER.map(color => (
                      <button
                        key={color.name}
                        className={`shop-filter-dropdown-pill${selectedColor === color.value ? ' selected' : ''}`}
                        style={{ borderColor: color.value }}
                        onClick={() => { setSelectedColor(color.value); setShowFilterDropdown(false); }}
                      >
                        <span className="shop-filter-color-dot" style={{ background: color.value }}></span>
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="shop-filter-dropdown-section">
                  <div className="shop-filter-dropdown-label">Category</div>
                  <div className="shop-filter-dropdown-options">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        className={`shop-filter-dropdown-pill${selectedCategory === cat ? ' selected' : ''}`}
                        onClick={() => { setSelectedCategory(cat); setShowFilterDropdown(false); }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="shop-filter-dropdown-section">
                  <div className="shop-filter-dropdown-label">Price</div>
                  <div className="shop-filter-dropdown-options">
                    <input
                      type="range"
                      min={100}
                      max={800}
                      value={priceRange[0]}
                      className="shop-price-slider"
                      onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                    />
                    <input
                      type="range"
                      min={100}
                      max={800}
                      value={priceRange[1]}
                      className="shop-price-slider"
                      onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                    />
                    <span className="shop-price-minmax">${priceRange[0]} - ${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="shop-side-sort">
            <span className="shop-side-sort-label">Sort by</span>
            <select className="shop-side-sort-dropdown" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="default">Default</option>
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Product Grid */}
        <div className="shop-product-grid">
          {PRODUCTS.map(product => (
            <div className="shop-product-card" key={product.id}>
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
                    <span className="shop-product-name">{product.name}</span>
                    
                  </div>
                  <span className="shop-product-cat" style={{ fontSize: 15 }}>{product.category}</span>
                </div>
                <span className="shop-product-view">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
