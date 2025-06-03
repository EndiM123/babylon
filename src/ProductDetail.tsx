import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './ProductDetail.css';
import Footer from './Footer';
import ProductTestimonials from './components/ProductTestimonials';
import CartPanel from './components/CartPanel';
import { CartContext } from './App';
import { supabase } from './lib/supabase';

// Product interface combining Supabase data and local metadata
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
  video?: string;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  sizes?: string[];
  materials?: string;
  shipping?: string;
  returns?: string;
}

// Local product metadata that won't change frequently
const PRODUCT_METADATA = {
  1: {
    image: '/media1.png',
    video: '',
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
  2: {
    image: '/media2.png',
    video: '',
    oldPrice: 790,
    rating: 4.9,
    reviews: 18,
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A luxury blazer with a curved-edge design, crafted from premium wool blend.',
    materials: 'Wool blend. Dry clean only.',
    shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
    returns: 'Returns accepted within 30 days. Free return shipping.',
    category: 'Outerwear',
  },
  3: {
    image: '/media3.png',
    video: '',
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
  4: {
    image: '/media4.png',
    video: '',
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
  5: {
    image: '/media5.png',
    video: '',
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
  6: {
    image: '/media6.png',
    video: '',
    oldPrice: 180,
    rating: 4.8,
    reviews: 8,
    sizes: [],
    description: 'A compact linen mini bag, perfect for summer outings and essentials. Lightweight and stylish.',
    materials: '100% Linen. Spot clean only.',
    shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
    returns: 'Returns accepted within 30 days. Free return shipping.',
    category: 'Accessories',
  }
};

// Default product details for fields not in the database
const DEFAULT_PRODUCT_DETAILS = {
  image: '/media1.png',
  video: '',
  oldPrice: 0,
  rating: 4.5,
  reviews: 0,
  sizes: ['S', 'M', 'L'],
  materials: 'Please see product description for materials information.',
  shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
  returns: 'Returns accepted within 30 days. Free return shipping.',
  category: 'Uncategorized',
  description: 'Product description not available'
};

const COLOR_OPTIONS = [
  { name: 'Navy', value: '#222' },
  { name: 'Orange', value: '#FF9900' },
  { name: 'Black', value: '#000' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0].name);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch product details from Supabase and combine with local metadata
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('id, name, price')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Get metadata for this product ID
          const metadata = PRODUCT_METADATA[data.id as keyof typeof PRODUCT_METADATA];
          
          if (metadata) {
            // Product exists in our local metadata
            const mergedProduct = {
              ...data,
              ...metadata
            };
            
            setProduct(mergedProduct);
            // Set initial selected size if available
            if (mergedProduct.sizes && mergedProduct.sizes.length > 0) {
              setSelectedSize(mergedProduct.sizes[0]);
            }
          } else {
            // Product exists in Supabase but not in our local metadata
            const productWithDefaults = {
              ...DEFAULT_PRODUCT_DETAILS,
              ...data
            };
            
            setProduct(productWithDefaults);
            // Set initial selected size
            if (productWithDefaults.sizes && productWithDefaults.sizes.length > 0) {
              setSelectedSize(productWithDefaults.sizes[0]);
            }
          }
        }
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const { setCart } = useContext(CartContext);

  function handleAddToCart() {
    setCartOpen(true);
  }

  function handleCartPanelAdd(panelQuantity?: number) {
    // Use the panelQuantity if provided, otherwise use the component's quantity state
    const finalQuantity = panelQuantity !== undefined ? panelQuantity : quantity;
    
    // Add or update product in cart
    if (!product) return;
    setCart((prevCart: any[]) => {
      const idx = prevCart.findIndex(item => 
        item.product.id === product.id && 
        item.size === selectedSize && 
        item.color === selectedColor
      );
      if (idx !== -1) {
        // Update quantity if same product, size and color already in cart
        const updated = [...prevCart];
        updated[idx] = { 
          ...updated[idx], 
          quantity: updated[idx].quantity + finalQuantity 
        };
        return updated;
      } else {
        // Add new product with size and color
        return [...prevCart, { 
          product, 
          quantity: finalQuantity, 
          size: selectedSize, 
          color: selectedColor 
        }];
      }
    });
    setCartOpen(false);
  }
  function handleBuyNow() {
    if (!product) return;
    
    // Create the cart item with all necessary details
    const cartItem = {
      product: {
        ...product,
        image: product.image || DEFAULT_PRODUCT_DETAILS.image
      },
      quantity,
      size: selectedSize,
      color: selectedColor
    };
    
    // Add the item to the cart
    setCart((prevCart: any[]) => [cartItem]);
    
    // Navigate to checkout
    navigate('/checkout', { 
      state: { 
        buyNow: true // This flag indicates it's a buy now flow
      } 
    });
  }

  if (loading) {
    return (
      <div className="product-loading">
        <div className="product-loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-error">
        <h2>Product not found</h2>
        <p>{error || 'The requested product could not be found.'}</p>
        <Link to="/shop" className="return-to-shop">Return to Shop</Link>
      </div>
    );
  }

  return (
    <>
      <CartPanel
        open={cartOpen}
        product={product}
        quantity={quantity}
        onClose={(qty) => handleCartPanelAdd(qty)}
        onQuantityChange={(newQty) => setQuantity(newQty)}
        onCheckout={() => {
          handleCartPanelAdd(quantity);
          navigate('/checkout');
        }}
      />
      <main>
        <div className="product-detail-mobile-image">
          <Swiper
            modules={[Navigation, Pagination, A11y, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={false}
            pagination={{ clickable: true }}
            effect="fade"
            className="mobile-swiper"
          >
            {[1, 2, 3, 4].map((num) => (
              <SwiperSlide key={num}>
                <img 
                  className="product-detail-media product-detail-media-tall" 
                  src={product.image} 
                  alt={`${product.name} view ${num}`} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {window.innerWidth >= 1200 && (
          <div className="product-gallery">
            <div className="thumbnail-container">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="thumbnail">
                  <img 
                    src={product.image} 
                    alt={`${product.name} view ${num}`} 
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
            <img src={product.image} alt={product.name} className="desktop-product-image" />
          </div>
        )}
        <div className="product-detail-info">
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-detail-price-row">
              <span className="product-detail-price">${product.price}</span>
            </div>
            <div className="product-detail-sizes">
              {product.sizes && product.sizes.length > 0 ? (
                product.sizes.map(size => (
                  <button
                    key={size}
                    className={`product-detail-size-btn${selectedSize === size ? ' selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <div className="product-detail-no-sizes">One size fits all</div>
              )}
            </div>
            <div className="product-detail-color-row">
              <span className="product-detail-color-label">Color</span>
              <div className="product-detail-color-options" role="radiogroup" aria-label="Select color">
                {COLOR_OPTIONS.map(opt => (
                  <button
                    key={opt.name}
                    className={`product-detail-color-option${selectedColor === opt.name ? ' selected' : ''}`}
                    aria-label={opt.name}
                    tabIndex={0}
                    type="button"
                    style={{ backgroundColor: opt.value }}
                    onClick={() => setSelectedColor(opt.name)}
                  >
                  </button>
                ))}
              </div>
            </div>
            <div className="product-detail-description-block">
              <div className="product-detail-description-label">DESCRIPTION</div>
              <p className="product-detail-description">{product.description}</p>
            </div>
            <div className="product-detail-qty-row">
              <button className="product-detail-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span className="product-detail-qty">{quantity}</span>
              <button className="product-detail-qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <div className="product-detail-cta-row">
              <button className="product-detail-add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
              <button className="product-detail-buy-now" onClick={handleBuyNow}>Buy Now</button>
            </div>
            <div className="product-detail-dropdowns">
              {[
                { label: 'Materials & Care', content: product.materials },
                { label: 'Shipping Info', content: product.shipping },
                { label: 'Returns Policy', content: product.returns }
              ].map(({ label, content }) => (
                <div className="product-detail-dropdown" key={label}>
                  <div className="product-detail-dropdown-toggle-static">{label}</div>
                  <div className="product-detail-dropdown-content open" style={{ maxHeight: 200 }}>{content}</div>
                </div>
              ))}
            </div>
            
            {/* Container for Product Info and More for You sections */}
            <div className="product-additional-info-container">
              {/* Testimonials section */}
              <ProductTestimonials />
              
              {/* More for You Section with Related Products */}
              <section className="solira-more-section">
                <h2 className="solira-more-title">More for You</h2>
                <div className="solira-more-grid">
                  {/* Product 1 */}
                  <article className="solira-more-card">
                    <Link to="/product/linen-set" className="solira-more-link">
                      <div className="solira-more-image-wrap">
                        <img 
                          src="/2linenpiece.png" 
                          alt="Linen Two-Piece Set" 
                          className="solira-more-image" 
                          loading="lazy"
                        />
                      </div>
                      <div className="solira-more-details">
                        <h3 className="solira-more-name">Linen Two-Piece Set</h3>
                        <p className="solira-more-price">$120.00</p>
                      </div>
                    </Link>
                  </article>
                  
                  {/* Product 2 */}
                  <article className="solira-more-card">
                    <Link to="/product/one-shoulder-swimsuit" className="solira-more-link">
                      <div className="solira-more-image-wrap">
                        <img 
                          src="/onesided.png" 
                          alt="One-Shoulder Swimsuit" 
                          className="solira-more-image" 
                          loading="lazy"
                        />
                      </div>
                      <div className="solira-more-details">
                        <h3 className="solira-more-name">One-Shoulder Swimsuit</h3>
                        <p className="solira-more-price">$89.00</p>
                      </div>
                    </Link>
                  </article>
                  
                  {/* Product 3 - Visible on all screen sizes */}
                  <article className="solira-more-card">
                    <Link to="/product/silk-scarf" className="solira-more-link">
                      <div className="solira-more-image-wrap">
                        <img 
                          src="/silkscarf.png" 
                          alt="Silk Scarf" 
                          className="solira-more-image" 
                          loading="lazy"
                        />
                      </div>
                      <div className="solira-more-details">
                        <h3 className="solira-more-name">Silk Scarf</h3>
                        <p className="solira-more-price">$65.00</p>
                      </div>
                    </Link>
                  </article>
                  
                  {/* Product 4 - Linen Blazer */}
                  <article className="solira-more-card">
                    <Link to="/product/linen-blazer" className="solira-more-link">
                      <div className="solira-more-image-wrap">
                        <img 
                          src="/sol5.png" 
                          alt="Linen Blazer" 
                          className="solira-more-image" 
                          loading="lazy"
                        />
                      </div>
                      <div className="solira-more-details">
                        <h3 className="solira-more-name">Linen Blazer</h3>
                        <p className="solira-more-price">$145.00</p>
                      </div>
                    </Link>
                  </article>
                </div>
              </section>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
