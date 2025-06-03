import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CartItem from './CartItem';
import { supabase } from '../lib/supabase';
import './CheckoutPage.css';
import { CartContext } from '../App';
import ReceiptModal from '../components/ReceiptModal';
import Footer from '../Footer';
import emailjs from '@emailjs/browser';

// Define interfaces for database tables
interface Customer {
  id?: number;
  name: string;
  email: string;
  phone_number: string;
  country: string;
  city: string;
  street: string;
  house_number: string;
}

interface Order {
  id?: number;
  customer_id: number;
  order_date: string;
  total_amount: number;
}

interface OrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
  size?: string | null;
  color?: string | null;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCart } = useContext(CartContext);
  
  // All purchases now go through the cart for a unified checkout experience
  
  // Calculate totals based on cart
  const subtotal = cart.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;
  
  // Function to handle quantity changes in checkout summary
  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove item from cart if quantity is 0
      setCart(prevCart => prevCart.filter(cartItem => 
        !(cartItem.product.id === item.product.id && 
          cartItem.size === item.size && 
          cartItem.color === item.color)
      ));
    } else {
      // Update quantity for the specific item
      setCart(prevCart => prevCart.map(cartItem => {
        if (cartItem.product.id === item.product.id && 
            cartItem.size === item.size && 
            cartItem.color === item.color) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      }));
    }
  };

  // Form state with fields that match our Customer interface
  const [form, setForm] = useState<Omit<Customer, 'id'>>({
    name: '',
    email: '',
    phone_number: '',
    country: '',
    city: '',
    street: '',
    house_number: ''
  });
  
  const [showReceipt, setShowReceipt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<{
    customer_id: number | null;
    order_id: number | null;
    items: any[];
  }>({
    customer_id: null,
    order_id: null,
    items: []
  });
  
  // Function to send order confirmation email to customer using EmailJS
  const sendCustomerConfirmationEmail = async (orderData: {
    customer_name: string;
    customer_email: string;
    total_amount: number;
    order_id: number | null;
  }) => {
    try {
      // EmailJS service, template, and user IDs for customer email
      const serviceId = 'service_378zmls';
      const templateId = 'template_7w50g1m';
      const publicKey = 'SALww_CcwbXpsAYiC';
      
      // Create a detailed order summary for the email
      const orderItems = cart.map(item => {
        const productName = item.product?.name || 'Product';
        const productPrice = item.product?.price || 0;
        const size = item.size ? `\n   Size: ${item.size}` : '';
        const color = item.color ? `\n   Color: ${item.color}` : '';
        return `${item.quantity}x ${productName} - $${(productPrice * item.quantity).toFixed(2)}${size}${color}`;
      }).join('\n\n');
      
      // Create template params that exactly match the EmailJS template variables for customer email
      const templateParams = {
        email: form.email,
        name: form.name,
        phone_number: form.phone_number,
        country: form.country,
        city: form.city,
        street: form.street,
        house_number: form.house_number,
        order_items: orderItems,
        total_amount: `$${orderData.total_amount.toFixed(2)}`,
        order_id: orderData.order_id,
        order_date: new Date().toLocaleDateString()
      };
      
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('Customer confirmation email sent successfully:', response);
    } catch (error) {
      console.error('Failed to send customer confirmation email:', error);
      // Don't throw error here - we don't want to disrupt the checkout flow
      // if email notification fails
    }
  };

  // Function to send order notification email to admin using EmailJS
  const sendOrderEmail = async (orderData: {
    customer_name: string;
    customer_email: string;
    total_amount: number;
    order_id: number | null;
  }) => {
    try {
      // EmailJS service, template, and user IDs (hardcoded as requested)
      const serviceId = 'service_378zmls';
      const templateId = 'template_ylw883v';
    
      const publicKey = 'SALww_CcwbXpsAYiC';
      
      // Create a detailed order summary for the email - using simple text format to avoid image reference issues
      const orderItems = cart.map(item => {
        const productName = item.product?.name || 'Product';
        const productPrice = item.product?.price || 0;
        const size = item.size ? `\n   Size: ${item.size}` : '';
        const color = item.color ? `\n   Color: ${item.color}` : '';
        return `${item.quantity}x ${productName} - $${(productPrice * item.quantity).toFixed(2)}${size}${color}`;
      }).join('\n\n');
      
      // Create template params that exactly match the Supabase customers table and EmailJS template variables
      const templateParams = {
        name: form.name,
        email: form.email,
        phone_number: form.phone_number,
        country: form.country,
        city: form.city,
        street: form.street,
        house_number: form.house_number,
        order_items: orderItems,
        total_amount: `$${orderData.total_amount.toFixed(2)}`,
        order_id: orderData.order_id,
        order_date: new Date().toLocaleDateString()
      };
      
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('Email notification sent successfully:', response);
    } catch (error) {
      console.error('Failed to send order notification email:', error);
      // Don't throw error here - we don't want to disrupt the checkout flow
      // if email notification fails
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Get the field name and value from the event
    const { name, value } = e.target;
    
    // Map 'phone' input to 'phone_number' in the form state
    const fieldName = name === 'phone' ? 'phone_number' : name;
    
    // Update the form state with the new value
    setForm(prevForm => ({
      ...prevForm,
      [fieldName]: value
    }));
    
    // Log for debugging
    console.log(`Field ${fieldName} updated to: ${value}`);
    console.log('Current form state:', form);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 1. Insert customer data with individual address fields
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert([
          { 
            name: form.name, 
            email: form.email,
            phone_number: form.phone_number,
            country: form.country,
            city: form.city,
            street: form.street,
            house_number: form.house_number
          }
        ])
        .select('id')
        .single();
      
      if (customerError) throw new Error(`Customer creation failed: ${customerError.message}`);
      if (!customerData) throw new Error('No customer data returned');
      
      const customerId = customerData.id;
      setOrderDetails(prev => ({ ...prev, customer_id: customerId }));
      
      // 2. Insert order with customer ID
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          { 
            customer_id: customerId,
            order_date: new Date().toISOString(),
            total_amount: total
          }
        ])
        .select('id')
        .single();
      
      if (orderError) throw new Error(`Order creation failed: ${orderError.message}`);
      if (!orderData) throw new Error('No order data returned');
      
      const orderId = orderData.id;
      setOrderId(orderId);
      setOrderDetails(prev => ({ ...prev, order_id: orderId }));
      
      // Insert order items from cart
      const orderItems: OrderItem[] = cart.map((item: any) => ({
        order_id: orderId,
        product_id: item.product.id,
        quantity: item.quantity,
        price_per_unit: item.product.price,
        size: item.size || null,
        color: item.color || null
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw new Error(`Order items creation failed: ${itemsError.message}`);
      
      // Update order details with cart items
      setOrderDetails(prev => ({ ...prev, items: [...cart] }));
      
      // Clear the cart after successful order
      setCart([]);
      
      // Order successfully completed
      setShowReceipt(true);
      
      // Send order notification emails - wrap in setTimeout to prevent blocking UI
      setTimeout(() => {
        // Send admin notification email
        sendOrderEmail({
          customer_name: form.name,
          customer_email: form.email,
          total_amount: total,
          order_id: orderId
        });
        
        // Send customer confirmation email
        sendCustomerConfirmationEmail({
          customer_name: form.name,
          customer_email: form.email,
          total_amount: total,
          order_id: orderId
        });
      }, 100);
      
    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="checkout-page-root">
      {showReceipt && (
        <ReceiptModal
          items={cart}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          orderId={orderId}
          onClose={() => {
            setShowReceipt(false);
            // Redirect to shop after closing receipt
            navigate('/shop');
          }}
        />
      )}
      
      {error && (
        <div className="checkout-error">
          <p>Error processing your order: {error}</p>
          <button onClick={() => setError(null)}>Try Again</button>
        </div>
      )}
      <main className="checkout-main">
        {typeof window !== 'undefined' && window.innerWidth <= 700 ? (
          <>
            <aside className="checkout-summary">
              <h3>Your Cart</h3>
              {cart.length > 0 ? (
                cart.map((item: any) => (
                  <div className="checkout-summary-product" key={`${item.product.id}-${item.size || ''}-${item.color || ''}`}>
                    <img src={item.product.image} alt={item.product.name} className="checkout-summary-thumbnail" />
                    <div className="checkout-summary-info">
                      <div className="checkout-summary-name">{item.product.name}</div>
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
                      <div className="checkout-summary-qty-control" data-component-name="CheckoutPage">
                        <button 
                          className="checkout-qty-btn minus" 
                          onClick={() => handleQuantityChange(item, Math.max(0, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="checkout-summary-qty">Qty: {item.quantity}</span>
                        <button 
                          className="checkout-qty-btn plus" 
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="checkout-summary-price">${item.product.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="checkout-summary-empty">No items in cart.</div>
              )}
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row checkout-summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </aside>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <h2>Contact & Delivery</h2>
              <input name="name" required placeholder="Full Name" value={form.name} onChange={handleChange} />
              <input name="email" required placeholder="Email" type="email" value={form.email} onChange={handleChange} />
              <input name="street" required placeholder="Street" value={form.street} onChange={handleChange} />
              <input name="house_number" required placeholder="House/Apartment Number" value={form.house_number} onChange={handleChange} />
              <input name="city" required placeholder="City" value={form.city} onChange={handleChange} />
              <input name="country" required placeholder="Country" value={form.country} onChange={handleChange} />
              <input name="phone" required placeholder="Phone Number" value={form.phone_number} onChange={handleChange} />
              <button type="submit" className="checkout-form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </>
        ) : (
          <>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <h2>Contact & Delivery</h2>
              <input name="name" required placeholder="Full Name" value={form.name} onChange={handleChange} />
              <input name="email" required placeholder="Email" type="email" value={form.email} onChange={handleChange} />
              <input name="street" required placeholder="Street" value={form.street} onChange={handleChange} />
              <input name="house_number" required placeholder="House/Apartment Number" value={form.house_number} onChange={handleChange} />
              <input name="city" required placeholder="City" value={form.city} onChange={handleChange} />
              <input name="country" required placeholder="Country" value={form.country} onChange={handleChange} />
              <input name="phone" required placeholder="Phone Number" value={form.phone_number} onChange={handleChange} />
              <button type="submit" className="checkout-form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
            <aside className="checkout-summary">
              <h3>Your Cart</h3>
              {cart.length > 0 ? (
                cart.map((item: any) => (
                  <div className="checkout-summary-product" key={`${item.product.id}-${item.size || ''}-${item.color || ''}`}>
                    <img src={item.product.image} alt={item.product.name} className="checkout-summary-thumbnail" />
                    <div className="checkout-summary-info">
                      <div className="checkout-summary-name">{item.product.name}</div>
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
                      <div className="checkout-summary-qty-control" data-component-name="CheckoutPage">
                        <button 
                          className="checkout-qty-btn minus" 
                          onClick={() => handleQuantityChange(item, Math.max(0, item.quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="checkout-summary-qty">Qty: {item.quantity}</span>
                        <button 
                          className="checkout-qty-btn plus" 
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="checkout-summary-price">${item.product.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="checkout-summary-empty">No items in cart.</div>
              )}
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row checkout-summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </aside>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
