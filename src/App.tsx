import React from 'react';
import './App.css';
import './global-video-override.css';
import AppRoutes from './AppRoutes';
import { Link } from 'react-router-dom';
import GlitterParticlesPortal from './GlitterParticlesPortal';

function App() {
  return (
    <>
      <GlitterParticlesPortal />
      <header className="babylon-header">
        <div className="babylon-header-inner">
          <div className="babylon-header-logo-space"></div>
          <nav className="babylon-nav">
            <Link to="/" className="babylon-nav-item">HOME</Link>
            <Link to="/shop" className="babylon-nav-item">SHOP</Link>
            <Link to="/about" className="babylon-nav-item">SOLIRA</Link>
            <Link to="/blog" className="babylon-nav-item">BLOG</Link>
            <Link to="/cart" className="babylon-nav-item">CART</Link>
          </nav>
        </div>
      </header>
      <AppRoutes />
    </>
  );
}

export default App;
