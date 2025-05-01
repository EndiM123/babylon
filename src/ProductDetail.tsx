import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';
import './App.css';

// Example product data. In real use, fetch from backend or context.
export const PRODUCTS = [
  {
    id: 1,
    name: 'Sculpted Linen Dress',
    image: '/media1.png',
    video: '',
    price: 420,
    oldPrice: 520,
    rating: 4.7,
    reviews: 32,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A modern linen dress with sculpted lines and editorial silhouette. Perfect for luxury evenings or elevated daywear.',
    materials: '100% Linen. Dry clean only.',
    shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
    returns: 'Returns accepted within 30 days. Free return shipping.',
    category: 'Dresses',
  },
  {
    id: 2,
    name: 'Curved Edge Blazer',
    image: '/media2.png',
    video: '',
    price: 690,
    oldPrice: 790,
    rating: 4.9,
    reviews: 18,
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A luxury blazer with a curved-edge design, crafted from premium wool blend.',
    materials: 'Wool blend. Dry clean only.',
    shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
    returns: 'Returns accepted within 30 days. Free return shipping.',
    category: 'Blazers',
  },
  // ...Add more products as needed
];

const COLORS = {
  mountbattenPink: '#A67899',
  linen: '#F7EFE5',
  tiffanyBlue: '#A9DDD6',
  darkGreen: '#1E3932',
};

const COLOR_OPTIONS = [
  { name: 'Navy', value: '#222' },
  { name: 'Orange', value: '#FF9900' },
  { name: 'Black', value: '#000' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].name);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');

  if (!product) return <div>Product not found.</div>;

  // For demonstration, only one image; extendable for more images
  const images = [product.image];

  return (
    <main className="product-detail-container">
      <div className="product-detail-media-container">
        {product.video ? (
          <video className="product-detail-media" src={product.video} autoPlay loop muted playsInline />
        ) : (
          <img className="product-detail-media" src={product.image} alt={product.name} />
        )}
      </div>
      <div className="product-detail-info-panel">
        <h1 className="product-detail-title">{product.name}</h1>
        <div className="product-detail-price-row">
          <span className="product-detail-price">${product.price}</span>
          {product.oldPrice && (
            <span className="product-detail-oldprice">${product.oldPrice}</span>
          )}
        </div>
        <div className="product-detail-sizes">
          {product.sizes.map(size => (
            <button
              key={size}
              className={`product-detail-size-btn${selectedSize === size ? ' selected' : ''}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="product-detail-color-row">
          <span className="product-detail-color-label">Color</span>
          <div className="product-detail-color-options" role="radiogroup" aria-label="Select color">
            {[
              { name: 'Navy', value: '#222' },
              { name: 'Orange', value: '#FF9900' },
              { name: 'Black', value: '#000' },
            ].map(opt => (
              <button
                key={opt.name}
                className={`product-detail-color-option${selectedColor === opt.name ? ' selected' : ''}`}
                style={{ color: selectedColor === opt.name ? '#222' : '#888' }}
                aria-checked={selectedColor === opt.name}
                aria-label={opt.name}
                tabIndex={0}
                onClick={() => setSelectedColor(opt.name)}
                onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && setSelectedColor(opt.name)}
                type="button"
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
        <p className="product-detail-description">{product.description}</p>
        <div className="product-detail-qty-row">
          <button className="product-detail-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
          <span className="product-detail-qty">{quantity}</span>
          <button className="product-detail-qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
        <div className="product-detail-cta-row">
          <button className="product-detail-cta add-to-cart">Add to Cart</button>
          <button className="product-detail-cta buy-now">Buy Now</button>
        </div>
        <div className="product-detail-dropdowns">
          {[
            { label: 'Materials & Care', content: product.materials },
            { label: 'Shipping Info', content: product.shipping },
            { label: 'Returns Policy', content: product.returns }
          ].map(({ label, content }) => (
            <div className="product-detail-dropdown" key={label}>
              <button
                className="product-detail-dropdown-toggle"
                onClick={() => setOpenDropdown(openDropdown === label ? null : label)}
              >
                {label}
                <span className={`dropdown-arrow${openDropdown === label ? ' open' : ''}`}>▼</span>
              </button>
              <div
                className={`product-detail-dropdown-content${openDropdown === label ? ' open' : ''}`}
                style={{ maxHeight: openDropdown === label ? 200 : 0 }}
              >
                {content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
