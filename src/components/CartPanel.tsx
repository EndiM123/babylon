import React from 'react';
import './CartPanel.css';

export interface CartPanelProps {
  open: boolean;
  product: {
    image?: string;
    name: string;
    price: number;
  } | null;
  quantity: number;
  onClose: (quantity?: number) => void;
  onQuantityChange: (qty: number) => void;
  onCheckout: () => void;
}

export default function CartPanel({ open, product, quantity, onClose, onQuantityChange, onCheckout }: CartPanelProps) {
  if (!product) return null;
  const subtotal = product.price * quantity;

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(quantity);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(quantity);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuantityChange(quantity + 1);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose(quantity);
  };

  const handleCheckout = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCheckout();
  };

  return (
    <div 
      className={`cart-panel-overlay${open ? ' open' : ''}`} 
      onClick={handleOverlayClick}
    >
      <aside 
        className={`cart-panel${open ? ' open' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="cart-panel-close" 
          onClick={handleCloseClick} 
          aria-label="Close cart"
        >
          ×
        </button>
        <div className="cart-panel-content">
          <div className="cart-panel-product-row">
            <img 
              src={product.image || '/default-product.png'} 
              alt={product.name} 
              className="cart-panel-thumbnail" 
            />
            <div className="cart-panel-product-info">
              <div className="cart-panel-product-name">{product.name}</div>
              <div className="cart-panel-product-price">${product.price.toFixed(2)}</div>
            </div>
          </div>
          <div className="cart-panel-qty-row">
            <button 
              className="cart-panel-qty-btn" 
              onClick={handleDecrease} 
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="cart-panel-qty-value">{quantity}</span>
            <button 
              className="cart-panel-qty-btn" 
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
        <div className="cart-panel-subtotal-row">
          <span>Subtotal</span>
          <span className="cart-panel-subtotal">${subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-panel-actions">
          <button 
            className="cart-panel-add-btn" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <button 
            className="cart-panel-checkout-btn" 
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}
