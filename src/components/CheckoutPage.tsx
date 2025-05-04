import React, { useState, useContext } from 'react';
import './CheckoutPage.css';
import { CartContext } from '../App';

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);
  const subtotal = cart.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: '', email: '', address: '', country: '', city: '', postal: '', phone: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: handle real checkout
    alert('Order placed!');
  }

  return (
    <div className="checkout-page-root">
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
              <input name="phone" required placeholder="Phone Number" value={form.phone} onChange={handleChange} />
              <button type="submit" className="checkout-form-submit">Place Order</button>
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
              <input name="phone" required placeholder="Phone Number" value={form.phone} onChange={handleChange} />
              <button type="submit" className="checkout-form-submit">Place Order</button>
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