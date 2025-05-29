import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="babylon-footer">
      <div className="footer-col footer-col--brand">
        <div className="footer-logo">BABYLON</div>
        <p className="footer-desc">We create fashion intended to elevate and inspire, blending editorial minimalism with timeless elegance.</p>
      </div>
      <div className="footer-col footer-col--links">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop All</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
        <ul>
          <li><a href="/faqs">FAQs</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/coming-soon">Coming Soon</a></li>
          <li><a href="/password">Password Protected</a></li>
          <li><a href="/error">Error 404</a></li>
        </ul>
        <ul>
          <li><a href="/style-guide">Style Guide</a></li>
          <li><a href="/instructions">Instructions</a></li>
          <li><a href="/licenses">Licenses</a></li>
          <li><a href="/changelog">Changelog</a></li>
          <li><a href="/link-in-bio">Link In Bio</a></li>
        </ul>
      </div>
      <div className="footer-col footer-col--contact">
        <div className="footer-contact-item">+236 789 952</div>
        <div className="footer-contact-item">hello@example.com</div>
        <div className="footer-contact-item">London, UK</div>
        <div className="footer-socials">
          <a href="/" aria-label="Facebook"><i className="icon-facebook" /></a>
          <a href="/" aria-label="Instagram"><i className="icon-instagram" /></a>
          <a href="/" aria-label="Twitter"><i className="icon-twitter" /></a>
          <a href="/" aria-label="Dribbble"><i className="icon-dribbble" /></a>
        </div>
      </div>
    </footer>
  );
}
