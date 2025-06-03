import React from 'react';
import './CartItem.css';

interface CartItemProps {
  item: {
    product: {
      id: string | number;
      name: string;
      image: string;
      price: number;
    };
    quantity: number;
    size?: string;
    color?: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="checkout-summary-product" key={`${item.product.id}-${item.size || ''}-${item.color || ''}`}>
      <img 
        src={item.product.image} 
        alt={item.product.name} 
        className="checkout-summary-thumbnail" 
      />
      <div className="checkout-summary-info">
        <div className="checkout-summary-name">{item.product.name}</div>
        <div className="checkout-summary-details">
          {item.size && (
            <div className="checkout-summary-detail">
              <span className="detail-label">Size:</span>
              <span className="detail-value">{item.size}</span>
            </div>
          )}
          {item.color && (
            <div className="checkout-summary-detail">
              <span className="detail-label">Color:</span>
              <span className="detail-value">{item.color}</span>
            </div>
          )}
          <div className="checkout-summary-detail">
            <span className="detail-label">Qty:</span>
            <span className="detail-value">{item.quantity}</span>
          </div>
        </div>
        <div className="checkout-summary-price">${(item.product.price * item.quantity).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CartItem;
