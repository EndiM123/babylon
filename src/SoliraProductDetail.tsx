import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from './supabaseClient'; // Default import instead of named import
import './SoliraProductDetail.css';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: string[];
  colors: string[];
  created_at?: string;
};

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

const SoliraProductDetail: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('No product ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('solira_products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data) {
          setProduct({
            ...data,
            // Ensure we have default values for optional fields
            sizes: data.sizes || ['S', 'M', 'L', 'XL'],
            colors: data.colors || ['Black', 'White', 'Beige']
          });
          
          // Set default selections
          if (data.sizes?.length) setSelectedSize(data.sizes[0]);
          if (data.colors?.length) setSelectedColor(data.colors[0]);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    // TODO: Implement add to cart logic
    console.log('Adding to cart:', {
      productId: id,
      size: selectedSize,
      color: selectedColor,
      quantity
    });
    
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr; Back to Collection
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found">
        <p>Product not found</p>
        <button className="back-button" onClick={() => navigate(-1)}>
          &larr; Back to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="solira-product-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Collection
      </button>
      
      <div className="product-container">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.jpg';
            }}
          />
        </div>
        
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          
          {product.colors && product.colors.length > 0 && (
            <div className="product-option">
              <label>Color</label>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="product-option">
              <label>Size</label>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="price-container">
            <span className="current-price">${product.price.toFixed(2)}</span>
          </div>
          
          <p className="product-description">{product.description}</p>
          
          <div className="category">
            <strong>Category:</strong> {product.category}
          </div>
          
          <div className="quantity-selector">
            <label>Quantity</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          
          {showSuccess && (
            <div className="success-message">
              Added to cart successfully!
            </div>
          )}
        </div>
      </div>
      
      {/* You can add related products or other sections here */}
    </div>
  );
};

export default SoliraProductDetail;
