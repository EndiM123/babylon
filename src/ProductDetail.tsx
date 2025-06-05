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

// Default values for product details
const DEFAULT_PRODUCT = {
  id: 0,
  name: 'Loading...',
  description: 'Loading product details...',
  price: 0,
  image: '/placeholder-image.jpg',
  category: '',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  materials: 'Material information not available',
  shipping: 'Free shipping on all orders. Delivery in 2-5 business days.',
  returns: 'Returns accepted within 30 days. Free return shipping.',
  rating: 4.5,
  reviews: 0,
  oldPrice: 0
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

  // Fetch product details from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch product from products table
        const { data, error } = await supabase
          .from('products')
          .select('id, name, description, price, image, category')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          // Merge with default values and set the product
          const productWithDefaults: Product = {
            ...DEFAULT_PRODUCT,
            ...data,
            // Ensure image URL is properly formatted
            image: data.image || DEFAULT_PRODUCT.image,
            // Add default values for missing fields
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            materials: 'Material information not specified',
            rating: 4.5, // Default rating
            reviews: Math.floor(Math.random() * 50), // Random reviews for demo
            oldPrice: data.price ? Math.round(data.price * 1.2) : 0, // Add 20% to price for oldPrice
          };
          
          setProduct(productWithDefaults);
          setSelectedSize(productWithDefaults.sizes?.[0] || 'M');
        } else {
          throw new Error('Product not found');
        }
      } catch (error: any) {
        console.error('Error fetching product:', error);
        setError(error.message || 'Failed to load product details');
        // Set default product with error state
        setProduct({
          ...DEFAULT_PRODUCT,
          name: 'Product Not Found',
          description: 'The requested product could not be found or loaded.',
        });
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
        image: product.image || DEFAULT_PRODUCT.image
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
