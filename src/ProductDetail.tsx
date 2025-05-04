import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import Footer from './Footer';
import CartPanel from './components/CartPanel';
import { CartContext } from './App';

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
  {
    id: 3,
    name: 'Minimalist Silk Top',
    image: '/media3.png',
    video: '',
    price: 240,
    oldPrice: 280,
    rating: 4.6,
    reviews: 21,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A sleek, minimalist silk top perfect for layering or wearing solo. Lightweight, soft, and versatile.',
    materials: '100% Silk. Dry clean only.',
    shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
    returns: 'Returns accepted within 30 days. Free return shipping.',
    category: 'Tops',
  },
  {
    id: 4,
    name: 'Soft Trapeze Skirt',
    image: '/media4.png',
    video: '',
    price: 310,
    oldPrice: 350,
    rating: 4.5,
    reviews: 15,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A soft, flowing trapeze skirt with a flattering silhouette. Effortlessly chic for any occasion.',
    materials: 'Viscose blend. Machine wash cold.',
    shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
    returns: 'Returns accepted within 30 days. Free return shipping.',
    category: 'Bottoms',
  },
  {
    id: 5,
    name: 'Tiffany Bikini',
    image: '/media5.png',
    video: '',
    price: 195,
    oldPrice: 220,
    rating: 4.3,
    reviews: 11,
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A stylish bikini set in a signature Tiffany blue. Comfortable, supportive, and eye-catching.',
    materials: 'Nylon, Spandex. Hand wash.',
    shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
    returns: 'Returns accepted within 30 days. Free return shipping.',
    category: 'Swimwear',
  },
  {
    id: 6,
    name: 'Linen Mini Bag',
    image: '/media6.png',
    video: '',
    price: 160,
    oldPrice: 180,
    rating: 4.8,
    reviews: 8,
    sizes: [],
    description: 'A compact linen mini bag, perfect for summer outings and essentials. Lightweight and stylish.',
    materials: '100% Linen. Spot clean only.',
    shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
    returns: 'Returns accepted within 30 days. Free return shipping.',
    category: 'Accessories',
  },
  // ...Add more products as needed
];

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
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const { cart, setCart } = useContext(CartContext);

  function handleAddToCart() {
    setCartOpen(true);
  }

  function handleCartPanelAdd() {
    // Add or update product in cart
    if (!product) return;
    setCart((prevCart: any[]) => {
      const idx = prevCart.findIndex(item => item.product.id === product.id);
      if (idx !== -1) {
        // Update quantity if already in cart
        const updated = [...prevCart];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + quantity };
        return updated;
      } else {
        // Add new product
        return [...prevCart, { product, quantity }];
      }
    });
    setCartOpen(false);
  }
  function handleBuyNow() {
    navigate('/checkout', { state: { product, quantity } });
  }

  if (!product) return <div>Product not found.</div>;

  return (
    <>
      <CartPanel
        open={cartOpen}
        product={product}
        quantity={quantity}
        onClose={handleCartPanelAdd}
        onQuantityChange={setQuantity}
        onCheckout={() => { setCartOpen(false); navigate('/checkout', { state: { product, quantity } }); }}
      />
      <main className="product-detail-container">
      <div className="product-detail-main-row">
        <div className="product-detail-media-container">
          <img className="product-detail-media product-detail-media-tall" src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info-panel">
        <div className="product-detail-price-row">
  <h1 className="product-detail-title">{product.name}</h1>
  <span className="product-detail-price">${product.price}</span>
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
            {COLOR_OPTIONS.map(opt => (
              <button
                key={opt.name}
                className={`product-detail-color-option${selectedColor === opt.name ? ' selected' : ''}`}
                style={{ color: selectedColor === opt.name ? '#222' : '#888' }}
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
          <button className="product-detail-cta add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="product-detail-cta buy-now" onClick={handleBuyNow}>Buy Now</button>
        </div>
        <div className="product-detail-dropdowns">
          {[
            { label: 'Materials & Care', content: product.materials },
            { label: 'Shipping Info', content: product.shipping },
            { label: 'Returns Policy', content: product.returns }
          ].map(({ label, content }) => (
            <div className="product-detail-dropdown" key={label}>
              <div className="product-detail-dropdown-toggle-static">
                {label}
              </div>
              <div className="product-detail-dropdown-content open" style={{ maxHeight: 200 }}>
                {content}
              </div>
            </div>
          ))}
        </div>
        {/* More For You Section */}
        <div className="more-for-you-section">
          <div className="more-for-you-title">More For You</div>
          <div className="more-for-you-row">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map((suggested) => (
              <Link to={`/product/${suggested.id}`} className="more-for-you-card" key={suggested.id}>
                <div className="more-for-you-img-wrap">
                  <img src={suggested.image} alt={suggested.name} className="more-for-you-img" />
                </div>
                <div className="more-for-you-info">
                  <div className="more-for-you-name">{suggested.name}</div>
                  <div className="more-for-you-prices">
                    <span className="more-for-you-price">${suggested.price}</span>
                    {suggested.oldPrice && (
                      <span className="more-for-you-oldprice">${suggested.oldPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
      </main>
    <Footer />
    </>
  );
}
