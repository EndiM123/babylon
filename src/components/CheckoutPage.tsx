import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './CheckoutPage.css';
import { CartContext } from '../App';
import ReceiptModal from '../components/ReceiptModal';
import { PostgrestError } from '@supabase/supabase-js';

// Define interfaces for database tables
interface Customer {
  id?: string; // Using string for UUID compatibility
  name: string;
  phone_number: string;
  email: string;
  // Address components - removed main address field
  country: string;
  city: string;
  street: string;
  house_number: string;
}

interface Order {
  id?: string; // Using string for UUID compatibility
  customer_id: string;
  order_date: string;
  total_amount: number;
}

interface OrderItem {
  id?: string; // Using string for UUID compatibility
  order_id: string;
  product_id: number;
  quantity: number;
  price_per_unit: number;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCart } = useContext(CartContext);
  
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

  // Form state with fields that match our Customer interface (divided address fields)
  const [form, setForm] = useState<Customer>({
    name: '',
    phone_number: '',
    email: '',
    country: '',
    city: '',
    street: '',
    house_number: ''
  });
  
  const [showReceipt, setShowReceipt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailedError, setDetailedError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Get the field name and value from the event
    const { name, value } = e.target;
    
    // Update the form state with the new value
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  }

  function resetForm() {
    setForm({
      name: '',
      phone_number: '',
      email: '',
      country: '',
      city: '',
      street: '',
      house_number: ''
    });
  }

  // Helper function to handle Supabase errors
  function handleSupabaseError(error: PostgrestError | null): string {
    if (!error) return 'Unknown error';
    return error.details || error.message || 'Unknown error';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setDetailedError(null);
    
    try {
      // 1. Insert customer data with exact fields matching the database schema
      console.log('Submitting customer data:', {
        name: form.name,
        phone_number: form.phone_number,
        email: form.email,
        // Include individual address components
        country: form.country,
        city: form.city,
        street: form.street,
        house_number: form.house_number
      });
      
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert([
          { 
            name: form.name, 
            phone_number: form.phone_number,
            email: form.email,
            // Send address components to Supabase
            country: form.country,
            city: form.city,
            street: form.street,
            house_number: form.house_number
          }
        ])
        .select('id')
        .single();
      
      if (customerError) {
        console.error('Customer creation error:', customerError);
        setDetailedError(handleSupabaseError(customerError));
        throw new Error(`Customer creation failed: ${customerError.message}`);
      }
      
      if (!customerData) {
        console.error('No customer data returned');
        throw new Error('No customer data returned');
      }
      
      console.log('Customer created successfully:', customerData);
      const customerId = customerData.id;
      
      // 2. Insert order with customer ID
      console.log('Creating order with customer_id:', customerId);
      const orderData = {
        customer_id: customerId,
        order_date: new Date().toISOString(),
        total_amount: total
      };
      
      console.log('Submitting order data:', orderData);
      const { data: createdOrder, error: orderError } = await supabase
        .from('orders')
        .insert([orderData])
        .select('id')
        .single();
      
      if (orderError) {
        console.error('Order creation error:', orderError);
        setDetailedError(handleSupabaseError(orderError));
        throw new Error(`Order creation failed: ${orderError.message}`);
      }
      
      if (!createdOrder) {
        console.error('No order data returned');
        throw new Error('No order data returned');
      }
      
      console.log('Order created successfully:', createdOrder);
      const orderId = createdOrder.id;
      setOrderId(Number(orderId)); // Convert to number for compatibility with ReceiptModal
      
      // 3. Insert order items
      if (isBuyNow) {
        // Handle Buy Now flow - insert single product
        const orderItem = {
          order_id: orderId,
          product_id: buyNowProduct.id,
          quantity: buyNowQuantity,
          price_per_unit: buyNowProduct.price
        };
        
        console.log('Submitting order item (Buy Now):', orderItem);
        const { error: itemError } = await supabase
          .from('order_items')
          .insert([orderItem]);
        
        if (itemError) {
          console.error('Order item creation error:', itemError);
          setDetailedError(handleSupabaseError(itemError));
          throw new Error(`Order item creation failed: ${itemError.message}`);
        }
        
        console.log('Order item created successfully (Buy Now)');
      } else {
        // Handle Cart flow - insert all cart items
        const orderItems = cart.map((item: any) => ({
          order_id: orderId,
          product_id: item.product.id,
          quantity: item.quantity,
          price_per_unit: item.product.price
        }));
        
        console.log('Submitting order items (Cart):', orderItems);
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);
        
        if (itemsError) {
          console.error('Order items creation error:', itemsError);
          setDetailedError(handleSupabaseError(itemsError));
          throw new Error(`Order items creation failed: ${itemsError.message}`);
        }
        
        console.log('Order items created successfully (Cart)');
      }
      
      // Order successfully completed
      console.log('Checkout completed successfully!');
      setShowReceipt(true);
      resetForm();
      
      // Clear cart if not in Buy Now mode
      if (!isBuyNow) {
        setCart([]);
      }
      
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
          {detailedError && (
            <div className="checkout-error-details">
              <p><strong>Technical details:</strong> {detailedError}</p>
            </div>
          )}
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
              <input name="phone_number" required placeholder="Phone Number" value={form.phone_number} onChange={handleChange} />
              
              {/* Address fields divided into components */}
              <div className="address-fields">
                <h3>Delivery Address</h3>
                <input name="country" required placeholder="Country" value={form.country} onChange={handleChange} />
                <input name="city" required placeholder="City" value={form.city} onChange={handleChange} />
                <input name="street" required placeholder="Street Name" value={form.street} onChange={handleChange} />
                <input name="house_number" required placeholder="House/Apartment Number" value={form.house_number} onChange={handleChange} />
              </div>
              
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
              <input name="phone_number" required placeholder="Phone Number" value={form.phone_number} onChange={handleChange} />
              
              {/* Address fields divided into components */}
              <div className="address-fields">
                <h3>Delivery Address</h3>
                <input name="country" required placeholder="Country" value={form.country} onChange={handleChange} />
                <input name="city" required placeholder="City" value={form.city} onChange={handleChange} />
                <input name="street" required placeholder="Street Name" value={form.street} onChange={handleChange} />
                <input name="house_number" required placeholder="House/Apartment Number" value={form.house_number} onChange={handleChange} />
              </div>
              
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
