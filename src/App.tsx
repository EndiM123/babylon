import React, { useState } from 'react';
import SoliraPreviewMenu from './components/SoliraPreviewMenu';
import './App.css';
import './global-video-override.css';
import AppRoutes from './AppRoutes';
import { Link } from 'react-router-dom';
import GlitterParticlesPortal from './GlitterParticlesPortal';

function App() {
  const [showSoliraPreview, setShowSoliraPreview] = useState(false);
  return (
    <>
      <GlitterParticlesPortal />
      <header className="babylon-header">
        <div className="babylon-header-inner">
          <div className="babylon-header-logo-space"></div>
          <nav className="babylon-nav">
            <Link to="/" className="babylon-nav-item">HOME</Link>
            <Link to="/shop" className="babylon-nav-item">SHOP</Link>
            <div
              onMouseEnter={() => setShowSoliraPreview(true)}
              onMouseLeave={() => setShowSoliraPreview(false)}
              style={{ display: 'inline-block' }}
            >
              <Link to="/about" className="babylon-nav-item">SOLIRA</Link>
            </div>
            <Link to="/blog" className="babylon-nav-item">BLOG</Link>
            <Link to="/cart" className="babylon-nav-item">CART</Link>
          </nav>
        </div>
      </header>
      {showSoliraPreview && (
        <div
          onMouseEnter={() => setShowSoliraPreview(true)}
          onMouseLeave={() => setShowSoliraPreview(false)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            left: 0,
            zIndex: 120,
            background: 'transparent',
            margin: 0,
            padding: 0,
          }}
          className="solira-preview-popover"
        >
          <SoliraPreviewMenu />
        </div>
      )}
      <AppRoutes />
    </>
  );
}

export default App;
