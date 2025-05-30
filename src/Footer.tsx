import React from 'react';
import './Footer.css';
import MapLocation from './components/MapLocation';

export default function Footer() {
  return (
    <footer className="babylon-footer">
      <div className="footer-container">
        <div className="footer-col footer-col--brand">
          <div className="footer-logo">BABYLON</div>
          <p className="footer-desc">We create fashion intended to elevate and inspire, blending editorial minimalism with timeless elegance.</p>
        </div>
        <div className="footer-col footer-col--links">
          <div className="footer-links-group">
            <h4 className="footer-links-heading">Navigation</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Shop All</a></li>
              <li><a href="/about">Solira</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-links-group">
            <h4 className="footer-links-heading">Resources</h4>
            <ul>
              <li><a href="/style-guide">Style Guide</a></li>
              <li><a href="/instructions">Instructions</a></li>
              <li><a href="/faqs">FAQs</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-col footer-col--contact">
          <div className="contact-header">
            <div className="contact-heading-row">
              <h4 className="footer-contact-heading">Contact Us</h4>
              <h4 className="footer-socials-heading">Follow Us</h4>
            </div>
          </div>
          <div className="contact-details-row">
            <div className="footer-contact-details">
              <div className="footer-contact-item">
                <i className="icon-phone" />
                <a href="tel:+38349333040">+383 49 333 040</a>
              </div>
              <div className="footer-contact-item">
                <i className="icon-envelope" />
                <a href="mailto:info@babylon-ks.com">info@babylon-ks.com</a>
              </div>
              <div className="footer-contact-item">
                <i className="icon-location" />
                <span>Babylon, Nr.6 Rruga Lah Nimani, Prishtina 10000</span>
              </div>
            </div>
            <div className="footer-socials">
              <div className="social-icons">
                <a href="https://www.instagram.com/babylon_pr/" target="_blank" rel="noopener noreferrer nofollow" aria-label="Instagram" className="social-icon">
                  <img src="/ig.png" alt="Instagram" className="social-icon-img" />
                </a>
                <a href="https://www.facebook.com/babylonaccessoriesks" target="_blank" rel="noopener noreferrer nofollow" aria-label="Facebook" className="social-icon">
                  <img src="/fb.png" alt="Facebook" className="social-icon-img" />
                </a>
              </div>
            </div>
          </div>
          <div className="mobile-map">
            <MapLocation />
          </div>
        </div>
      </div>
    </footer>
  );
}
