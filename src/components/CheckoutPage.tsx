import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './CheckoutPage.css';
import { CartContext } from '../App';
import ReceiptModal from '../components/ReceiptModal';

// Define interfaces for database tables
interface Customer {
  id?: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  // Additional fields for UI that will be concatenated into address field
  country?: string;
  city?: string;
  postal?: string;
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
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);
  
  // Get product from location state if coming from Buy Now
  const buyNowProduct = location.state?.product;
  const buyNowQuantity = location.state?.quantity || 1;
  
  // Determine if we're in Buy Now flow or Cart flow
  const isBuyNow = !!buyNowProduct;
  
  // Calculate totals based on cart or buy now product
  const subtotal = isBuyNow 
    ? buyNowProduct.price * buyNowQuantity 
    : cart.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  // Form state with fields that match our Customer interface
  const [form, setForm] = useState<Customer>({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    country: '',
    city: '',
    postal: ''
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
      // Format full address from form fields
      const fullAddress = `${form.address}, ${form.city}, ${form.postal}, ${form.country}`;
      
      // 1. Insert customer data
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert([
          { 
            name: form.name, 
            email: form.email,
            phone_number: form.phone_number,
            address: fullAddress
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
      
      // 3. Insert order items
      if (isBuyNow) {
        // Handle Buy Now flow - insert single product
        const orderItem: OrderItem = {
          order_id: orderId,
          product_id: buyNowProduct.id,
          quantity: buyNowQuantity,
          price_per_unit: buyNowProduct.price
        };
        
        const { error: itemError } = await supabase
          .from('order_items')
          .insert([orderItem]);
        
        if (itemError) throw new Error(`Order item creation failed: ${itemError.message}`);
        
        setOrderDetails(prev => ({ ...prev, items: [{ product: buyNowProduct, quantity: buyNowQuantity }] }));
      } else {
        // Handle Cart flow - insert all cart items
        const orderItems: OrderItem[] = cart.map((item: any) => ({
          order_id: orderId,
          product_id: item.product.id,
          quantity: item.quantity,
          price_per_unit: item.product.price
        }));
        
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
        
        if (itemsError) throw new Error(`Order items creation failed: ${itemsError.message}`);
        
        setOrderDetails(prev => ({ ...prev, items: [...cart] }));
      }
      
      // Order successfully completed
      setShowReceipt(true);
      
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
          items={isBuyNow ? [{ product: buyNowProduct, quantity: buyNowQuantity }] : cart}
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
                  <div className="checkout-summary-product" key={item.product.id}>
                    <img src={item.product.image} alt={item.product.name} className="checkout-summary-thumbnail" />
                    <div className="checkout-summary-info">
                      <div className="checkout-summary-name">{item.product.name}</div>
                      <div className="checkout-summary-qty">Qty: {item.quantity}</div>
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
              <input name="address" required placeholder="Street Address" value={form.address} onChange={handleChange} />
              <input name="country" required placeholder="Country" value={form.country} onChange={handleChange} />
              <input name="city" required placeholder="City" value={form.city} onChange={handleChange} />
              <input name="postal" required placeholder="Postal Code" value={form.postal} onChange={handleChange} />
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
              <input name="address" required placeholder="Street Address" value={form.address} onChange={handleChange} />
              <input name="country" required placeholder="Country" value={form.country} onChange={handleChange} />
              <input name="city" required placeholder="City" value={form.city} onChange={handleChange} />
              <input name="postal" required placeholder="Postal Code" value={form.postal} onChange={handleChange} />
              <input name="phone" required placeholder="Phone Number" value={form.phone_number} onChange={handleChange} />
              <button type="submit" className="checkout-form-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
            <aside className="checkout-summary">
              <h3>Your Cart</h3>
              {cart.length > 0 ? (
                cart.map((item: any) => (
                  <div className="checkout-summary-product" key={item.product.id}>
                    <img src={item.product.image} alt={item.product.name} className="checkout-summary-thumbnail" />
                    <div className="checkout-summary-info">
                      <div className="checkout-summary-name">{item.product.name}</div>
                      <div className="checkout-summary-qty">Qty: {item.quantity}</div>
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
    </div>
  );
}
